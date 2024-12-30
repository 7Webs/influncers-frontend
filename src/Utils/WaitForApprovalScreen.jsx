import React from "react";
import { useAuth } from "./AuthContext";
import { Container, Typography, Button, Box } from "@mui/material";

const WaitForApprovalScreen = () => {
  const { user, logout } = useAuth();

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        py: 4,
      }}
    >
      <Box
        sx={{
          mb: 4,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Thank You for Joining Us!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          We're currently reviewing your account details to ensure everything is
          in order. Once approved, you'll be able to explore and redeem amazing
          deals in no time. Thank you for your patience and understanding!
        </Typography>
        {user && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Account Details:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Name: {user.name || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email || "N/A"}
            </Typography>
          </Box>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, fontStyle: "italic" }}
        >
          If you need assistance, feel free to contact our support team.
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={handleLogout}
        sx={{
          textTransform: "uppercase",
          fontWeight: 600,
          px: 4,
          py: 1.5,
          backgroundColor: "#000",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        Log Out
      </Button>
    </Container>
  );
};

export default WaitForApprovalScreen;
