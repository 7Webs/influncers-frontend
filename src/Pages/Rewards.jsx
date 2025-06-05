import React from 'react';
import styled from '@emotion/styled';
import { Container, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../Utils/AuthContext';
import { dummyUserPoints, availableRewards, userRewardHistory } from '../Data/RewardsData';

const PageContainer = styled(Container)`
  margin-top: 96px;
  margin-bottom: 32px;
`;

const PointsCard = styled(Box)`
  background: linear-gradient(135deg, #2B6CB0 0%, #1A365D 100%);
  border-radius: 16px;
  padding: 32px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`;

const PointsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const PointsItem = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(5px);
`;

const RewardsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const RewardCard = styled(Box)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const RewardImage = styled('img')`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RewardContent = styled(Box)`
  padding: 24px;
`;

const RewardValue = styled(Typography)`
  display: inline-block;
  background: #EDF2F7;
  color: #2D3748;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  margin-top: 8px;
`;

const RedeemButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  background: ${props => props.disabled ? '#CBD5E0' : '#2B6CB0'};
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-transform: none;
  font-weight: 600;
  
  &:hover {
    background: ${props => props.disabled ? '#CBD5E0' : '#1A365D'};
  }
`;

const Rewards = () => {
  const { user } = useAuth();

  const handleRedeem = (reward) => {
    // TODO: Implement redemption logic
    console.log('Redeeming reward:', reward);
  };

  return (
    <PageContainer maxWidth="lg">
      <PointsCard>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Sistema de Puntos
        </Typography>
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
          {dummyUserPoints} puntos
        </Typography>
        <PointsGrid>
          <PointsItem>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Por Colaboración
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              100 puntos
            </Typography>
          </PointsItem>
          <PointsItem>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Por Gasto
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              5 puntos
            </Typography>
            <Typography variant="body2">
              por cada € gastado
            </Typography>
          </PointsItem>
          <PointsItem>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Por Visualización
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              0.5 puntos
            </Typography>
            <Typography variant="body2">
              por cada vista en redes sociales
            </Typography>
          </PointsItem>
          <PointsItem>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Por Me Gusta
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              1 punto
            </Typography>
            <Typography variant="body2">
              por cada like en redes sociales
            </Typography>
          </PointsItem>
        </PointsGrid>
      </PointsCard>

      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        Premios Disponibles
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Canjea tus puntos por estas increíbles recompensas
      </Typography>

      <RewardsGrid>
        {availableRewards.map((reward) => (
          <RewardCard key={reward.id}>
            <RewardImage src={reward.image} alt={reward.title} />
            <RewardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {reward.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                {reward.description}
              </Typography>
              <RewardValue>
                Valor: {reward.value}
              </RewardValue>
              <Typography variant="subtitle2" sx={{ mt: 2, color: 'text.secondary' }}>
                Puntos necesarios: {reward.pointsRequired}
              </Typography>
              <RedeemButton
                variant="contained"
                disabled={dummyUserPoints < reward.pointsRequired}
                onClick={() => handleRedeem(reward)}
              >
                {dummyUserPoints >= reward.pointsRequired
                  ? 'Canjear Ahora'
                  : `Te faltan ${reward.pointsRequired - dummyUserPoints} puntos`}
              </RedeemButton>
            </RewardContent>
          </RewardCard>
        ))}
      </RewardsGrid>
    </PageContainer>
  );
};

export default Rewards;