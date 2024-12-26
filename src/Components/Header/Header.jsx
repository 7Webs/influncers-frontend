import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import {
  Headset as HeadsetIcon,
} from "@mui/icons-material";
import CategoryDropdown from "./CategoryDropdown";
import { useAuth } from "../../Utils/AuthContext";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../Utils/CategoryContext";

const HeaderMain = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const { categories } = useCategory();

  const handleForYouClick = () => {
    nav("/home");
    setTimeout(() => {
      const trendySection = document.querySelector(".trendyProducts");
      if (trendySection) {
        trendySection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleHomeClick = () => {
    nav("/home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AppBar
        sx={{ bgcolor: "#fff", color: "#333" }}
        position="fixed"
        elevation={0}
      >
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #eee",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: 40, cursor: 'pointer' }}
              onClick={() => {
                nav('/home');
                window.location.reload();
              }}
            />

            <CategoryDropdown categories={categories} />
            <Button color="inherit" onClick={handleHomeClick}>
              Home
            </Button>
            <Button color="inherit" onClick={handleForYouClick}>
              For You
            </Button>
            <Button color="inherit" onClick={() => nav("/redeemed-coupons")}>
              My Coupons
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HeadsetIcon />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  1900 - 888
                </Typography>
                <Typography variant="caption">24/7 Support Center</Typography>
              </Box>
            </Box>

            {user && (
              <Box
                sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  nav("/profile");
                }}
              >
                <Avatar src={user?.photo} alt={user?.displayName} />
                <Typography variant="subtitle1" sx={{ ml: 0.5 }}>
                  Account
                </Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ height: "80px" }} />
    </>
  );
};

export default HeaderMain;
