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
        });
      } else {
        setTimeRemaining({
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          progress: 0,
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
        background: "#cccccc",
        color: "black",
        py: 1,
        px: 2,
      }}
    >
      <Grid container spacing={1} alignItems="center">
        {/* Left section with image and basic info */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          onClick={() => {
            nav(`/redeemed-deals/${redeemedDeal.id}`);
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={redeemedDeal.deal.images?.[0]}
              sx={{ width: 40, height: 40 }}
              variant="rounded"
            />
            <Box>
              <h4 style={{ margin: "0 0 2px 0", fontSize: "1rem" }}>
                {redeemedDeal.deal.title}
              </h4>
              <Stack direction="row" spacing={1} alignItems="center">
                <Store sx={{ fontSize: "0.75rem" }} />
                <p style={{ margin: 0, fontSize: "0.75rem" }}>
                  {redeemedDeal.deal.shop.name}
                </p>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Middle section with coupon and status */}
        <Grid item xs={12} sm={6} md={4}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <LocalOffer sx={{ fontSize: "0.875rem" }} />
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                letterSpacing: 1,
                fontSize: "0.875rem",
              }}
            >
              {redeemedDeal.couponCode}
            </p>
            <Tooltip title="Copy code">
              <IconButton
                size="small"
                onClick={handleCopyCode}
                sx={{ color: "white", p: 0.5 }}
              >
                <ContentCopy sx={{ fontSize: "0.875rem" }} />
              </IconButton>
            </Tooltip>
            <Chip
              label={redeemedDeal.status.replace("_", " ")}
              color={getStatusColor(redeemedDeal.status)}
              size="small"
              sx={{ textTransform: "capitalize", height: 20 }}
            />
          </Stack>
        </Grid>

        {/* Right section with timer */}
        <Grid item xs={12} md={4}>
          <Stack alignItems="center" spacing={0.5}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTime sx={{ fontSize: "0.75rem" }} />
              <p style={{ margin: 0, fontSize: "0.75rem" }}>
                &nbsp; Use Before: &nbsp;
              </p>
              <h4
                style={{
                  margin: 0,
                  fontFamily: "monospace",
                  fontSize: "1rem",
                }}
              >
                {`${formatNumber(timeRemaining.hours)}:${formatNumber(
                  timeRemaining.minutes
                )}:${formatNumber(timeRemaining.seconds)}`}
              </h4>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={timeRemaining.progress}
              sx={{
                height: 2,
                width: "100%",
                borderRadius: 1,
                bgcolor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "white",
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
