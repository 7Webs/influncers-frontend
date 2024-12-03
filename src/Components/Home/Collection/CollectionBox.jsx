import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const CollectionContainer = styled(Box)(({ theme }) => ({
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

const CollectionSection = styled(Box)(({ theme, bgImage }) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  padding: "30px",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const LeftSection = styled(CollectionSection)(({ theme }) => ({
  flex: 1,
  height: "600px",
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

const TopSection = styled(CollectionSection)(({ theme }) => ({
  height: "290px",
}));

const BottomSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  height: "290px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const BottomBox = styled(CollectionSection)(({ theme }) => ({
  flex: 1,
  height: "100%",
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

const CollectionBox = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <CollectionContainer>
      <LeftSection bgImage="https://images.pexels.com/photos/7319317/pexels-photo-7319317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
        <Typography sx={{ fontSize: "14px", mb: 1 }}>Hot List</Typography>
        <Typography variant="h3" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600, mb: 2 }}>
          <Box component="span" sx={{ color: "#C22928" }}>Women</Box> Collection
        </Typography>
        <Box>
          <StyledLink to="/shop" onClick={scrollToTop}>
            Shop Now
          </StyledLink>
        </Box>
      </LeftSection>

      <RightSection>
        <TopSection bgImage="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
          <Typography sx={{ fontSize: "14px", mb: 1 }}>Hot List</Typography>
          <Typography variant="h3" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600, mb: 2 }}>
            <Box component="span" sx={{ color: "#C22928" }}>Men</Box> Collection
          </Typography>
          <Box>
            <StyledLink to="/shop" onClick={scrollToTop}>
              Shop Now
            </StyledLink>
          </Box>
        </TopSection>

        <BottomSection>
          <BottomBox bgImage="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <Typography sx={{ fontSize: "14px", mb: 1 }}>Hot List</Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600, mb: 2 }}>
              <Box component="span" sx={{ color: "#C22928" }}>Kids</Box> Collection
            </Typography>
            <Box>
              <StyledLink to="/shop" onClick={scrollToTop}>
                Shop Now
              </StyledLink>
            </Box>
          </BottomBox>

          <BottomBox bgImage="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <Typography variant="h3" sx={{ fontSize: { xs: "24px", sm: "32px" }, fontWeight: 600, mb: 2 }}>
              <Box component="span" sx={{ color: "#C22928" }}>E-gift</Box> Cards
            </Typography>
            <Typography sx={{ fontSize: "14px", mb: 2 }}>
              Surprise someone with the gift they really want.
            </Typography>
            <Box>
              <StyledLink to="/shop" onClick={scrollToTop}>
                Shop Now
              </StyledLink>
            </Box>
          </BottomBox>
        </BottomSection>
      </RightSection>
    </CollectionContainer>
  );
};

export default CollectionBox;
