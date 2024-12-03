import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

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

const DealTimerBox = styled(Box)(({ theme }) => ({
  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 31,
    hours: 29,
    minutes: 57,
    seconds: 17,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const { days, hours, minutes, seconds } = prevTimeLeft;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTimeLeft;
        }
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        let newDays = days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <DealContainer>
      <DealTimerBox>
        <TimerContent>
          <Box>
            <Typography variant="subtitle1" sx={{ fontSize: "14px", mb: 2 }}>
              Deal of the Week
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: "30px", sm: "40px" }, fontWeight: 600 }}>
              Spring <Box component="span" sx={{ color: "#C22928" }}>Collection</Box>
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
                {timeLeft.hours}
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

          <StyledLink to="/shop" onClick={scrollToTop}>
            Shop Now
          </StyledLink>
        </TimerContent>
      </DealTimerBox>
    </DealContainer>
  );
};

export default DealTimer;
