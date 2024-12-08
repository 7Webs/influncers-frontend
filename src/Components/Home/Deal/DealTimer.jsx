import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../../../redux/slice/dealsSlice";

const DealContainer = styled(Box)(({ theme }) => ({
  padding: "0 160px",
  marginTop: "50px",
  [theme.breakpoints.down("lg")]: {
    padding: "0 60px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0 20px",
  },
}));

const DealTimerBox = styled(Box)(({ theme, bgImage }) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
}));

const TimerContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "30px",
}));

const TimerCounter = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginTop: "20px",
}));

const TimeDigit = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
  padding: "12px 25px",
  border: "2px solid white",
  transition: "all 0.3s ease",
  marginTop: "20px",
  display: "inline-block",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
}));

const DealTimer = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals?.list || []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  // Get the next valid deal
  const getNextValidDeal = (deals) => {
    if (!deals.length) return null;
    
    const now = new Date();
    const validDeals = deals
      .filter(deal => new Date(deal.availableUntil) > now)
      .sort((a, b) => new Date(a.availableUntil) - new Date(b.availableUntil));
    
    return validDeals.length > 0 ? validDeals[0] : null;
  };

  const activeDeal = getNextValidDeal(deals);

  useEffect(() => {
    if (!activeDeal) return;

    const calculateTimeLeft = () => {
      const endDate = new Date(activeDeal.availableUntil);
      endDate.setHours(23, 59, 0, 0);
      const difference = endDate - new Date();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [activeDeal]);

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  if (!activeDeal) return null;

  return (
    <DealContainer>
      <DealTimerBox bgImage={activeDeal.images[0]}>
        <TimerContent>
          <Box>
            <Typography variant="subtitle1" sx={{ fontSize: "14px", mb: 2 }}>
              Deal of the Week
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: "30px", sm: "40px" }, fontWeight: 600 }}>
              {activeDeal.title} <Box component="span" sx={{ color: "#C22928" }}>{activeDeal.shortTagLine}</Box>
            </Typography>
          </Box>

          <TimerCounter>
            <TimeDigit>
              <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600 }}>
                {timeLeft.days}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>Days</Typography>
            </TimeDigit>
            <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600 }}>:</Typography>
            <TimeDigit>
              <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600 }}>
                {formatTime(timeLeft.hours)}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>Hours</Typography>
            </TimeDigit>
            <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600 }}>:</Typography>
            <TimeDigit>
              <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600 }}>
                {formatTime(timeLeft.minutes)}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>Minutes</Typography>
            </TimeDigit>
            <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600 }}>:</Typography>
            <TimeDigit>
              <Typography variant="h4" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600 }}>
                {formatTime(timeLeft.seconds)}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>Seconds</Typography>
            </TimeDigit>
          </TimerCounter>

          <StyledLink to="/shop">
            Shop Now
          </StyledLink>
        </TimerContent>
      </DealTimerBox>
    </DealContainer>
  );
};

export default DealTimer;
