import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  LinearProgress,
  Stack,
  Tooltip,
  IconButton,
  Chip,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AccessTime,
  ContentCopy,
  Headset as HeadsetIcon,
  LocalOffer,
  Store,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleForYouClick = () => {
    nav("/home");
  };

  const handleHomeClick = () => {
    window.location.href = "https://nanoinfluencers.io/";
  };

  return (
    <>
      <AppBar
        sx={{ bgcolor: "#fff", color: "#333" }}
        position="fixed"
        elevation={0}
      >
        {user.openRedeemedDeal && (
          <RedeemedDealTimer redeemedDeal={user.openRedeemedDeal} />
        )}
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
              style={{ height: 40, cursor: "pointer" }}
              onClick={() => {
                nav("/home");
                window.location.reload();
              }}
            />

            <CategoryDropdown categories={categories} />
            <Button size="small" color="inherit" onClick={handleForYouClick}>
              For You
            </Button>
            <Button
              size="small"
              color="inherit"
              onClick={() => nav("/redeemed-coupons")}
            >
              My Coupons
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <HeadsetIcon />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    +34606662830
                  </Typography>
                  <Typography variant="caption">24/7 Support Center</Typography>
                </Box>
              </Box>
            )}

            {user && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  nav("/profile");
                }}
              >
                <Avatar src={user?.photo} alt={user?.displayName} />
                {!isMobile && (
                  <Typography variant="subtitle1" sx={{ ml: 0.5 }}>
                    Account
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ height: "120px" }} />
    </>
  );
};

export default HeaderMain;
