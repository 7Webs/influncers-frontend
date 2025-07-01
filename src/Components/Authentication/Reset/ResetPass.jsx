import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import { useAuth } from "../../../Utils/AuthContext";

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
    padding: "5px",
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
  padding: "10px",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "#333",
  },
  textTransform: "uppercase",
  fontWeight: 600,
}));

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  return (
    <StyledSection>
      <Typography variant="h2" sx={{ fontSize: "26px", fontWeight: 600 }}>
        Restablecer tu Contraseña
      </Typography>
      <StyledContainer>
        <Typography sx={{ fontSize: "14px", color: "#767676" }}>
          Te enviaremos un correo electrónico para restablecer tu contraseña
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            type="email"
            placeholder="Dirección de correo electrónico *"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Enviar
          </StyledButton>
        </StyledForm>
      </StyledContainer>
      <Typography sx={{ fontSize: "14px", color: "#767676" }}>
        Volver a{" "}
        <Link
          to="/loginSignUp"
          style={{
            color: "black",
            textDecoration: "none",
          }}
        >
          Iniciar Sesión
        </Link>
      </Typography>
    </StyledSection>
  );
};

export default ResetPass;
