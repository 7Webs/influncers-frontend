import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
  InputBase,
  Select,
  MenuItem,
  styled,
} from "@mui/material";

import logo from "../../Assets/logo.png";

import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "35px 160px",
  position: "sticky",
  zIndex: 10,
  backgroundColor: "white",
  boxShadow: "0 10px 33px rgba(0, 0, 0, 0.1)",
  flexDirection: "row",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const LogoLinkContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "60px",
  width: "40%",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "40%",
    background: "blue",
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "40px",
  "& a": {
    textDecoration: "none",
    color: "#1b1b1b",
    fontSize: "14px",
    fontWeight: 600,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-5px",
      left: 0,
      width: 0,
      height: "2px",
      backgroundColor: "#1b1b1b",
      transition: "width 0.3s ease-out",
    },
    "&:hover::after": {
      width: "60%",
      transitionDelay: "0.1s",
    },
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "35px",
  "& a": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "black",
  },
}));

const MobileNav = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 60px",
    position: "relative",
    zIndex: 10,
    backgroundColor: "white",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px 15px",
  },
}));

const MobileMenu = styled(Box)(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "60px",
  height: "100vh",
  backgroundColor: "#fff",
  position: "absolute",
  top: "74px",
  right: 0,
  width: "100%",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  opacity: open ? 1 : 0,
  transform: open ? "translateY(0)" : "translateY(-100%)",
  transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
  zIndex: 9,
  borderTop: "1px solid #e4e4e4",
  overflow: open ? "hidden" : "visible",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
  "& .searchBarContainer": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "10px 20px",
    border: "1px solid #e4e4e4",
    borderRadius: "5px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  fontSize: "14px",
  "& input": {
    border: "none",
    outline: "none",
  },
}));

const MobileMenuList = styled(List)(({ theme }) => ({
  listStyleType: "none",
  padding: 0,
  margin: 0,
  borderBottom: "1px solid #e0e0e0",
  "& .MuiListItem-root": {
    padding: "10px 20px",
  },
  "& a": {
    textDecoration: "none",
    color: "#1b1b1b",
    fontSize: "16px",
    fontWeight: 600,
  },
}));

const MobileMenuFooter = styled(Box)(({ theme }) => ({
  padding: "15px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));

const AccountLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
  color: "black",
  "& p": {
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  marginTop: "5px",
  "& .MuiSelect-select": {
    padding: "10px",
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  "& svg": {
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <LogoLinkContainer>
          <LogoContainer>
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" />
            </Link>
          </LogoContainer>
          <Box>
            <StyledList>
              <ListItem>
                <Link to="/" onClick={scrollToTop}>
                  HOME
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/shop" onClick={scrollToTop}>
                  SHOP
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/about" onClick={scrollToTop}>
                  ABOUT
                </Link>
              </ListItem>

            </StyledList>
          </Box>
        </LogoLinkContainer>
        <IconContainer>
          <IconButton onClick={scrollToTop}>
            <FiSearch size={22} />
          </IconButton>
          <IconButton component={Link} to="/profile" onClick={scrollToTop}>
            <FaRegUser size={22} />
          </IconButton>
          <IconButton onClick={scrollToTop}>
            <FiHeart size={22} />
          </IconButton>
        </IconContainer>
      </StyledAppBar>

      <MobileNav>
        <IconButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <MdOutlineClose size={22} /> : <RiMenu2Line size={22} />}
        </IconButton>
        <LogoContainer>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </LogoContainer>
      </MobileNav>

      <MobileMenu open={mobileMenuOpen}>
        <Box>
          <SearchContainer>
            <Box className="searchBarContainer">
              <StyledInputBase placeholder="Search products" />
              <IconButton component={Link} to="/shop" onClick={toggleMobileMenu}>
                <FiSearch size={22} />
              </IconButton>
            </Box>
          </SearchContainer>
          <MobileMenuList>
            <ListItem>
              <Link to="/" onClick={toggleMobileMenu}>
                HOME
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/shop" onClick={toggleMobileMenu}>
                SHOP
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/about" onClick={toggleMobileMenu}>
                ABOUT
              </Link>
            </ListItem>

          </MobileMenuList>
        </Box>

        <MobileMenuFooter>
          <Box>
            <AccountLink to="/loginSignUp" onClick={toggleMobileMenu}>
              <FaRegUser />
              <Typography>My Account</Typography>
            </AccountLink>
          </Box>
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Language</Typography>
              <StyledSelect defaultValue="english" variant="outlined">
                <MenuItem value="english">United States | English</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </StyledSelect>
            </Box>
            <Box>
              <Typography>Currency</Typography>
              <StyledSelect defaultValue="USD" variant="outlined">
                <MenuItem value="USD">$ USD</MenuItem>
                <MenuItem value="INR">₹ INR</MenuItem>
                <MenuItem value="EUR">€ EUR</MenuItem>
                <MenuItem value="GBP">£ GBP</MenuItem>
              </StyledSelect>
            </Box>
          </Box>
          <SocialLinks>
            <FaFacebookF size={20} />
            <FaInstagram size={20} />
            <FaYoutube size={20} />
            <FaPinterest size={20} />
          </SocialLinks>
        </MobileMenuFooter>
      </MobileMenu>
    </>
  );
};

export default Navbar;
