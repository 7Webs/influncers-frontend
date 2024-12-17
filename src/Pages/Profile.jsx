import React from "react";
import { useAuth } from "../Utils/AuthContext";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Button,
  Grid,
  styled,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  CameraAlt,
  Edit,
} from "@mui/icons-material";
import { PiEnvelope, PiGenderIntersex, PiPhone } from "react-icons/pi";
import { IoCalendar, IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Styled Components
const CoverPhoto = styled(Box)({
  height: 200,
  background: "linear-gradient(120deg, #2196f3 0%, #673ab7 100%)",
  position: "relative",
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  margin: "auto",
  marginTop: -60,
}));

const SocialButton = styled(IconButton)(({ color }) => ({
  backgroundColor: color,
  color: "white",
  "&:hover": {
    opacity: 0.9,
  },
  margin: 4,
}));

const Profile = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const socialLinks = [
    { Icon: Facebook, color: "#3b5998", link: user?.facebookProfileLink },
    { Icon: Instagram, color: "#E1306C", link: user?.instagramProfileLink },
    { Icon: Twitter, color: "#1DA1F2", link: user?.twitterProfileLink },
    { Icon: LinkedIn, color: "#0077b5", link: user?.linkedinProfileLink },
  ];

  return (
    <Box>
      <Container maxWidth="lg">
        {/* User Information Card */}
        <Card sx={{ mb: 3, boxShadow: 0.3 }}>
          <CoverPhoto>
            <IconButton
              sx={{
                color: "white",
                position: "absolute",
                right: 16,
                bottom: 16,
                bgcolor: "rgba(0,0,0,0.3)",
              }}
            >
              <CameraAlt />
            </IconButton>
          </CoverPhoto>
          <CardContent>
            <ProfileAvatar
              src={user?.photo || "https://via.placeholder.com/150"}
            >
              {!user?.photo && (user?.name?.[0] || "U")}
            </ProfileAvatar>
            <Typography variant="h5" align="center" fontWeight="bold">
              {user?.name || "User Name"}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              {user?.category?.name + " Influencer" || "General User"}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PiGenderIntersex size={20} color="#757575" />
                  <Typography variant="body1" color="text.secondary">
                    {user?.gender || "Not specified"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PiEnvelope size={20} color="#757575" />
                  <Typography variant="body1" color="text.secondary">
                    {user?.email || "Not provided"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PiPhone size={20} color="#757575" />
                  <Typography variant="body1" color="text.secondary">
                    {user?.phone || "Not provided"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" gap={1}>
                  <IoLocation size={20} color="#757575" />
                  <Typography variant="body1" color="text.secondary">
                    {user?.location || "Not specified"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <IoCalendar size={20} color="#757575" />
                  <Typography variant="body1" color="text.secondary">
                    Joined on {user?.createdAt.split("T")[0] || "Not available"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" my={2}>
              {socialLinks.map(
                ({ Icon, color, link }, index) =>
                  link && (
                    <SocialButton
                      key={index}
                      href={link}
                      target="_blank"
                      color={color}
                    >
                      <Icon fontSize="small" />
                    </SocialButton>
                  )
              )}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                startIcon={<Edit />}
                onClick={(e) => {
                  e.preventDefault();
                  nav("/profile/edit");
                }}
              >
                Edit Profile
              </Button>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
