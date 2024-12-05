import React from "react";
import { useAuth } from "../Utils/AuthContext";
import { Box, Typography, Button, Container, Paper } from "@mui/material";

const Profile = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>

                {user ? (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            User Details
                        </Typography>
                        <Typography>
                            <strong>Email:</strong> {user.email}
                        </Typography>
                        <Typography>
                            <strong>Name:</strong> {user.name || "Not provided"}
                        </Typography>
                        <Typography>
                            <strong>User ID:</strong> {user.uid}
                        </Typography>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                            sx={{ mt: 3 }}
                        >
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Typography>Please login to view profile details.</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Profile;
