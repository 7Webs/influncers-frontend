import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Tooltip,
  IconButton,
  Chip,
  Grid,
  Container,
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
            {/* <Button color="inherit" onClick={handleHomeClick}>
              Home
            </Button> */}
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
                  +34606662830
                </Typography>
                <Typography variant="caption">24/7 Support Center</Typography>
              </Box>
            </Box>

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
                <Typography variant="subtitle1" sx={{ ml: 0.5 }}>
                  Account
                </Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ height: "120px" }} />
    </>
  );
};

const RedeemedDealTimer = ({ redeemedDeal }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    progress: 100,
    isExpired: false
  });

  const nav = useNavigate();

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const createdAt = new Date(redeemedDeal.createdAt);
      const expiryTime = new Date(createdAt.getTime() + 48 * 60 * 60 * 1000);
      const now = new Date();
      const diff = expiryTime - now;

      const totalDuration = 48 * 60 * 60;
      const remainingSeconds = Math.max(0, Math.floor(diff / 1000));
      const progress = (remainingSeconds / totalDuration) * 100;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeRemaining({
          hours,
          minutes,
          seconds,
          totalSeconds: remainingSeconds,
          progress,
          isExpired: false
        });
      } else {
        setTimeRemaining({
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          progress: 0,
          isExpired: true
        });
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [redeemedDeal.createdAt]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending_usage":
        return "warning";
      case "used":
        return "success";
      default:
        return "default";
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(redeemedDeal.couponCode);
    toast.success("Coupon code copied to clipboard!");
  };

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #1a237e 0%, #0d47a1 100%)",
        color: "white",
        py: 0.5,
        px: 3,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Left section with image and basic info */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            cursor: "pointer",
            "&:hover": {
              opacity: 0.9,
            },
          }}
          onClick={() => {
            nav(`/redeemed-deals/${redeemedDeal.id}`);
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={redeemedDeal.deal.images?.[0]}
              sx={{
                width: 50,
                height: 50,
                border: "2px solid rgba(255,255,255,0.2)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
              variant="rounded"
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {redeemedDeal.deal.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Store sx={{ fontSize: "0.875rem" }} />
                <Typography variant="body2">
                  {redeemedDeal.deal.shop.name}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Middle section with coupon and status */}
        <Grid item xs={12} sm={6} md={4}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <LocalOffer sx={{ fontSize: "1rem" }} />
            <Typography
              sx={{
                fontFamily: "monospace",
                letterSpacing: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                background: "rgba(255,255,255,0.1)",
                padding: "4px 12px",
                borderRadius: "4px",
              }}
            >
              {redeemedDeal.couponCode}
            </Typography>
            <Tooltip title="Copy code">
              <IconButton
                size="small"
                onClick={handleCopyCode}
                sx={{
                  color: "white",
                  p: 1,
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                <ContentCopy />
              </IconButton>
            </Tooltip>
            <Chip
              label={timeRemaining.isExpired ? "OverDue" : redeemedDeal.status.replace("_", " ")}
              color={timeRemaining.isExpired ? "error" : getStatusColor(redeemedDeal.status)}
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                px: 1
              }}
            />
          </Stack>
        </Grid>

        {/* Right section with timer */}
        <Grid item xs={12} md={4}>
          <Stack alignItems="center" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTime />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {timeRemaining.isExpired ? "OverDue" : "OverDue in:"}
              </Typography>
              {!timeRemaining.isExpired && (
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: timeRemaining.hours < 6 ? "#ff9800" : "inherit"
                  }}
                >
                  {`${formatNumber(timeRemaining.hours)}:${formatNumber(
                    timeRemaining.minutes
                  )}:${formatNumber(timeRemaining.seconds)}`}
                </Typography>
              )}
            </Stack>
            <LinearProgress
              variant="determinate"
              value={timeRemaining.progress}
              sx={{
                height: 4,
                width: "100%",
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: timeRemaining.isExpired ? "#f44336" : timeRemaining.hours < 6 ? "#ff9800" : "#4caf50",
                  transition: "transform 0.2s linear"
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default HeaderMain;
