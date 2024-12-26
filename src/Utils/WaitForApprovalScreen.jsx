import React from "react";
import { useAuth } from "./AuthContext";
import { Container, Typography, Button, Box } from "@mui/material";

const WaitForApprovalScreen = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Account Pending Approval
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your account is not approved yet. Please wait for further updates or
          contact support if you believe there’s a delay.
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleLogout}
        sx={{
          textTransform: "none",
        }}
      >
        Log Out
      </Button>
    </Container>
  );
};

export default WaitForApprovalScreen;
