import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const BannerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  padding: "0 160px",
  marginTop: "50px",
  [theme.breakpoints.down("lg")]: {
    padding: "0 60px",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "0 20px",
  },
}));

const BannerSection = styled(Box)(({ theme, isRight }) => ({
  flex: 1,
  height: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "30px",
  backgroundColor: isRight ? "#F5F5F5" : "#000000",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const StyledLink = styled(Link)(({ theme, isRight }) => ({
  color: isRight ? "black" : "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-5px",
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: isRight ? "black" : "white",
    transition: "width 0.3s ease-out",
  },
  "&:hover::after": {
    width: "80%",
  },
}));

const Banner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BannerContainer>
      <BannerSection>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: "white", 
            fontSize: "14px", 
            fontWeight: 500,
            mb: 1 
          }}
        >
          Starting At $19
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            color: "white", 
            fontSize: { xs: "24px", sm: "32px" }, 
            fontWeight: 600,
            mb: 2 
          }}
        >
          Women's T-shirts
        </Typography>
        <StyledLink to="/shop" onClick={scrollToTop}>
          Shop Now
        </StyledLink>
      </BannerSection>

      <BannerSection isRight>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: "black", 
            fontSize: "14px", 
            fontWeight: 500,
            mb: 1 
          }}
        >
          Starting At $39
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            color: "black", 
            fontSize: { xs: "24px", sm: "32px" }, 
            fontWeight: 600,
            mb: 2 
          }}
        >
          Men's Sportswear
        </Typography>
        <StyledLink to="/shop" onClick={scrollToTop} isRight>
          Shop Now
        </StyledLink>
      </BannerSection>
    </BannerContainer>
  );
};

export default Banner;
