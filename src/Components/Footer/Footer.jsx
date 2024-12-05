import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Link as MuiLink,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import paymentIcon from "../../Assets/paymentIcon.png";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

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
    background: "blue",
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

const FooterBottom = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
  borderTop: "1px solid #cfcdcd",
  paddingTop: "30px",
  gap: "20px",
}));

const LangCurrencyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
}));

const SelectContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "30px",
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  border: "none",
  backgroundColor: "transparent",
  fontSize: "14px",
  "& .MuiSelect-select": {
    paddingTop: "0",
    paddingBottom: "0",
  },
  "&:before, &:after": {
    display: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
  };

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
              <img src={logo} alt="Logo" />
            </LogoContainer>
            <Typography sx={{ fontSize: "14px" }}>
              Deo Nagar, Giridih, Jarkhand, India - 815312
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                support@7webs.co.in
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                +91 9876543210
              </Typography>
            </Box>
            <SocialLinks>
              <FaFacebookF />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </SocialLinks>
          </Box>
        </Grid>



        <Grid item xs={12} md={2}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 600, textTransform: "uppercase" }}>
              Shop
            </Typography>
            <Box component="ul" sx={{ display: "flex", flexDirection: "column", gap: "15px", p: 0 }}>
              {["New Arrivals", "Accessories", "Men", "Women", "Shop All"].map((item, index) => (
                <Box component="li" key={index} sx={{ listStyle: "none" }}>
                  <StyledLink to="/shop" onClick={scrollToTop}>
                    {item}
                  </StyledLink>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 600, textTransform: "uppercase" }}>
              Help
            </Typography>
            <Box component="ul" sx={{ display: "flex", flexDirection: "column", gap: "15px", p: 0 }}>
              {[
                { text: "Customer Service", link: "/contact" },
                { text: "My Account", link: "/loginSignUp" },
                { text: "Find a Store", link: "/contact" },
                { text: "Legal & Privacy", link: "/terms" },
                { text: "Contact", link: "/contact" },
                { text: "Gift Card", link: "/" },
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
            <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: 600, textTransform: "uppercase" }}>
              Subscribe
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Be the first to get the latest news about trends, promotions, and much more!
            </Typography>
            <StyledForm onSubmit={handleSubscribe}>
              <StyledInput
                placeholder="Your email address"
                required
                type="email"
                fullWidth
              />
              <SubscribeButton type="submit">Join</SubscribeButton>
            </StyledForm>
            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: 500 }}>
              Secure Payments
            </Typography>
            <PaymentContainer>
              <img src={paymentIcon} alt="Payment Methods" />
            </PaymentContainer>
          </Box>
        </Grid>
      </FooterContainer>

      <FooterBottom>
        <Typography sx={{ fontSize: "14px" }}>
          2024 7Webs. All Rights Reserved | Made By{" "}
          <MuiLink
            href="https://github.com/7Webs"
            target="_blank"
            rel="noreferrer"
            sx={{ color: "#C22928", textDecoration: "none" }}
          >
            7Webs
          </MuiLink>{" "}

        </Typography>

        <LangCurrencyContainer>
          <SelectContainer>
            <Typography>Language</Typography>
            <StyledSelect defaultValue="english">
              <MenuItem value="english">United States | English</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="French">French</MenuItem>
            </StyledSelect>
          </SelectContainer>
          <SelectContainer>
            <Typography>Currency</Typography>
            <StyledSelect defaultValue="USD">
              <MenuItem value="USD">$ USD</MenuItem>
              <MenuItem value="INR">₹ INR</MenuItem>
              <MenuItem value="EUR">€ EUR</MenuItem>
              <MenuItem value="GBP">£ GBP</MenuItem>
            </StyledSelect>
          </SelectContainer>
        </LangCurrencyContainer>
      </FooterBottom>
    </StyledFooter>
  );
};

export default Footer;
