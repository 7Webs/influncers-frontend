import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Button,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
  Container,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  LinearProgress,
  Stack,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  AccessTime,
  ContentCopy,
  LocalOffer,
  Store,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import CategoryDropdown from "./CategoryDropdown";
import { useAuth } from "../../Utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../Utils/CategoryContext";
import { toast } from "react-toastify";

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
  position: "fixed",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "80px",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 24px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 16px",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#333333",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#1E3FE4",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const GetStartedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1E3FE4",
  color: "white",
  textTransform: "none",
  padding: "8px 24px",
  borderRadius: "24px",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#1733b7",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    marginLeft: "auto",
  },
}));

const HeaderMain = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const { categories } = useCategory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleForYouClick = () => {
    nav("/home");
    setMobileMenuOpen(false);
  };

  const handleMyCouponsClick = () => {
    nav("/redeemed-coupons");
    setMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    nav("/profile");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <StyledAppBar>
        {user?.openRedeemedDeal && (
          <RedeemedDealTimer redeemedDeal={user.openRedeemedDeal} />
        )}
        <Container maxWidth="xl">
          <StyledToolbar>
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
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

            {/* Desktop Navigation */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CategoryDropdown categories={categories} />
              <NavButton onClick={handleForYouClick}>Para ti</NavButton>
              <NavButton onClick={handleMyCouponsClick}>Mis cupones</NavButton>
              <NavButton onClick={() => nav('/rewards')}>Recompensas</NavButton>

              {user && !isMobile && (
                <GetStartedButton
                  onClick={handleProfileClick}
                  startIcon={
                    <Avatar
                      src={user?.photo}
                      alt={user?.displayName}
                      sx={{ width: 32, height: 32 }}
                    />
                  }
                >
                  Mi cuenta
                </GetStartedButton>
              )}

              {/* Mobile Menu Button */}
              <MobileMenuButton
                edge="end"
                color="inherit"
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon sx={{ color: "#000" }} />
              </MobileMenuButton>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: "280px",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {user && (
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={user?.photo} alt={user?.displayName} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
        )}
        <List>
          <ListItem button onClick={handleForYouClick}>
            <ListItemText primary="Para ti" />
          </ListItem>
          <ListItem button onClick={handleMyCouponsClick}>
            <ListItemText primary="Mis cupones" />
          </ListItem>
          {/* <ListItem button onClick={() => {
            nav('/rewards');
            setMobileMenuOpen(false);
          }}>
            <ListItemText primary="Recompensas" />
          </ListItem> */}
          <ListItem button onClick={handleProfileClick}>
            <ListItemText primary="Mi cuenta" />
          </ListItem>
        </List>
      </Drawer>

      <div
        style={{
          height: user?.openRedeemedDeal
            ? isMobile
              ? "200px"
              : "120px"
            : "100px",
        }}
      />

      {/* Redeemed Deal Timer Component */}
      {/* {user?.openRedeemedDeal && <RedeemedDealTimer redeemedDeal={user.openRedeemedDeal} />} */}
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
    isExpired: false,
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
          isExpired: false,
        });
      } else {
        setTimeRemaining({
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          progress: 0,
          isExpired: true,
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
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ContentCopy />
              </IconButton>
            </Tooltip>
            <Chip
              label={
                timeRemaining.isExpired
                  ? "OverDue"
                  : redeemedDeal.status.replace("_", " ")
              }
              color={
                timeRemaining.isExpired
                  ? "error"
                  : getStatusColor(redeemedDeal.status)
              }
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                px: 1,
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
                    color: timeRemaining.hours < 6 ? "#ff9800" : "inherit",
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
                  bgcolor: timeRemaining.isExpired
                    ? "#f44336"
                    : timeRemaining.hours < 6
                    ? "#ff9800"
                    : "#4caf50",
                  transition: "transform 0.2s linear",
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
