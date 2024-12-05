import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";

const ErrorContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  textAlign: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  backgroundColor: "black",
  color: "white",
  padding: "15px 30px",
  textDecoration: "none",
  marginTop: "20px",
  textTransform: "uppercase",
  fontWeight: 500,
  letterSpacing: "1px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const Error = () => {
  return (
    <ErrorContainer>
      <Typography variant="h1" sx={{ fontWeight: 700, fontSize: { xs: "3rem", sm: "4rem" }, mb: 2 }}>
        OOPS!
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 500, fontSize: { xs: "1.5rem", sm: "2rem" }, mb: 3 }}>
        Page not found
      </Typography>
      <Typography sx={{ fontSize: "1rem", mb: 3, color: "#666" }}>
        Sorry, we couldn't find the page you where looking for. We suggest that you
        <br />
        return to home page.
      </Typography>
      <StyledLink to="/">Go Back</StyledLink>
    </ErrorContainer>
  );
};

export default Error;
