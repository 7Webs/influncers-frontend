import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import paymentIcon from "../../Assets/paymentIcon.png";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: "30px 160px",
  backgroundColor: "#e4e4e4",
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  gap: "100px",
  [theme.breakpoints.down("lg")]: {
    padding: "50px 60px",
  },
}));

const FooterContainer = styled(Grid)(({ theme }) => ({
  gap: "50px",
  paddingTop: "50px",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: "10px",
  "& img": {
    width: "150px",
    height: "auto",
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "30px",
  width: "240px",
  "& svg": {
    cursor: "pointer",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  fontSize: "14px",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-5px",
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: "black",
    transition: "width 0.3s ease-out",
  },
  "&:hover::after": {
    width: "80%",
    transitionDelay: "0.1s",
  },
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    "& fieldset": {
      border: "none",
    },
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  padding: "10px 20px",
  backgroundColor: "white",
  color: "black",
  border: "none",
  textTransform: "uppercase",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));

const PaymentContainer = styled(Box)(({ theme }) => ({
  height: "30px",
  width: "250px",
  "& img": {
    width: "100%",
    height: "100%",
    background: "none !important",
  },
}));

const SocialIconLink = styled("a")(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  fontSize: "24px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#666",
  },
}));

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <StyledFooter>
      <FooterContainer container>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <LogoContainer>
              {/* Logo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px",
                }}
              >
                <img
                  src="https://nanoinfluencers.io/wp-content/uploads/2024/11/nanoinfluencers.io_Logo_small-removebg-preview.png"
                  alt="Logo"
                  style={{
                    height: "60px",
                    cursor: "pointer",
                    background: "none",
                  }}
                  onClick={() => {
                    nav("/home");
                    window.location.reload();
                  }}
                />
              </Box>
            </LogoContainer>
            <Typography sx={{ fontSize: "14px" }}>
              Copyright © 2025 nanoinfluencers.io, All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                contact@nanoinfluencers.io
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                +34606662830
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Páginas
            </Typography>
            <Box
              component="ul"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                p: 0,
              }}
            >
              {[
                { text: "Home", link: "/home" },
                { text: "Mis cupones", link: "/redeemed-coupons" },
                { text: "Perfil", link: "/profile" },
              ].map((item, index) => (
                <Box component="li" key={index} sx={{ listStyle: "none" }}>
                  <StyledLink to={item.link} onClick={scrollToTop}>
                    {item.text}
                  </StyledLink>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Síguenos
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Stay connected with us on social media for updates and exclusive
              offers!
            </Typography>
            <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <SocialIconLink href="#" target="_blank" aria-label="Facebook">
                <FaFacebookF />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.instagram.com/nanoinfluencers.io"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href="#" target="_blank" aria-label="YouTube">
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href="#" target="_blank" aria-label="Pinterest">
                <FaPinterest />
              </SocialIconLink>
              <SocialIconLink href="#" target="_blank" aria-label="TikTok">
                <FaTiktok />
              </SocialIconLink>
            </Box>
            {/* <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: 500 }}>
              Secure Payments
            </Typography>
            <PaymentContainer>
              <img src={paymentIcon} alt="Payment Methods" />
            </PaymentContainer> */}
          </Box>
        </Grid>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
