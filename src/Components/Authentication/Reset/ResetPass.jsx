import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, TextField, Button, styled } from "@mui/material";

const StyledSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "40px",
  padding: "50px 0",
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "500px",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "20px",
    "& fieldset": {
      borderColor: "#e4e4e4",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "20px",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "#333",
  },
  textTransform: "uppercase",
  fontWeight: 600,
}));

const ResetPass = () => {
  return (
    <StyledSection>
      <Typography variant="h2" sx={{ fontSize: "26px", fontWeight: 600 }}>
        Reset Your Password
      </Typography>
      <StyledContainer>
        <Typography sx={{ fontSize: "14px", color: "#767676" }}>
          We will send you an email to reset your password
        </Typography>
        <StyledForm>
          <StyledTextField
            type="email"
            placeholder="Email address *"
            required
            fullWidth
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Submit
          </StyledButton>
        </StyledForm>
      </StyledContainer>
      <Typography sx={{ fontSize: "14px", color: "#767676" }}>
        Back to{" "}
        <Link
          to="/loginSignUp"
          style={{
            color: "black",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </Typography>
    </StyledSection>
  );
};

export default ResetPass;
