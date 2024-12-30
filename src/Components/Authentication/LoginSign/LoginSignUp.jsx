import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  styled,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useAuth } from "../../../Utils/AuthContext";
import AnimatedLoader from "../../Loaders/AnimatedLoader";

const StyledSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "50px",
  paddingBottom: "70px",
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "55px",
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
}));

const TabButton = styled(Typography)(({ theme, active }) => ({
  border: "none",
  cursor: "pointer",
  textTransform: "uppercase",
  fontSize: "16px",
  fontWeight: 600,
  position: "relative",
  transition: "color 0.3s",
  color: active ? "black" : "#767676",
  "&:hover": {
    color: "black",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-5px",
    left: 0,
    width: active ? "100%" : 0,
    height: "2px",
    backgroundColor: "black",
    transition: "width 0.2s ease, left 0.2s ease",
  },
  "&:hover::after": {
    width: "100%",
    left: 0,
    transitionDelay: "0.2s",
  },
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "400px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "0 20px",
  },
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

const SocialButton = styled(Button)(({ theme }) => ({
  padding: "10px",
  backgroundColor: "white",
  color: "black",
  border: "2px solid #e4e4e4",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    border: "2px solid black",
  },
  textTransform: "none",
  fontWeight: 500,
  marginBottom: "0px",
}));

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const {
    user,
    loading,
    authChecked,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
  } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (authChecked && user) {
      console.log("User logged in:", user);
      navigate("/home");
    }
  }, [user, authChecked]);

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = login(formData.email, formData.password);
      if (loggedInUser) {
        console.log("User logged in:", loggedInUser);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const registeredUser = register(formData.email, formData.password);
      if (registeredUser) {
        console.log("User registered:", registeredUser);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await loginWithGoogle();
      if (googleUser) {
        console.log("Google login successful:", googleUser);
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const appleUser = await loginWithApple();
      if (appleUser) {
        console.log("Apple login successful:", appleUser);
      }
    } catch (error) {
      console.error("Apple login error:", error);
    }
  };

  if (!authChecked || loading) {
    return (
      <div>
        <AnimatedLoader />
      </div>
    );
  }

  return (
    <StyledSection>
      <StyledContainer>
        <TabsContainer>
          <TabButton
            onClick={() => handleTab("tabButton1")}
            active={activeTab === "tabButton1"}
          >
            Login
          </TabButton>
          <TabButton
            onClick={() => handleTab("tabButton2")}
            active={activeTab === "tabButton2"}
          >
            Register
          </TabButton>
        </TabsContainer>
        <Box>
          {activeTab === "tabButton1" && (
            <Box>
              <StyledForm onSubmit={handleLogin}>
                <StyledTextField
                  type="email"
                  placeholder="Email address *"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <StyledTextField
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to="/resetPassword"
                    style={{
                      fontSize: "14px",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
                <StyledButton type="submit" variant="contained" fullWidth>
                  Log In
                </StyledButton>

                <Divider sx={{ my: 0 }}>OR</Divider>

                <SocialButton
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                >
                  Continue with Google
                </SocialButton>
                <SocialButton
                  fullWidth
                  startIcon={<AppleIcon />}
                  onClick={handleAppleLogin}
                >
                  Continue with Apple
                </SocialButton>
              </StyledForm>
              <Box sx={{ paddingTop: "20px", textAlign: "center" }}>
                <Typography sx={{ fontSize: "14px", color: "#767676" }}>
                  No account yet?{" "}
                  <Box
                    component="span"
                    onClick={() => handleTab("tabButton2")}
                    sx={{
                      color: "black",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    Create Account
                  </Box>
                </Typography>
              </Box>
            </Box>
          )}

          {activeTab === "tabButton2" && (
            <Box>
              <StyledForm onSubmit={handleRegister}>
                <StyledTextField
                  placeholder="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <StyledTextField
                  placeholder="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <StyledTextField
                  type="email"
                  placeholder="Email address *"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <StyledTextField
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password *"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledButton type="submit" variant="contained" fullWidth>
                  Register
                </StyledButton>
              </StyledForm>
              <Box sx={{ paddingTop: "20px", textAlign: "center" }}>
                <Typography sx={{ fontSize: "14px", color: "#767676" }}>
                  Already have an account?{" "}
                  <Box
                    component="span"
                    onClick={() => handleTab("tabButton1")}
                    sx={{
                      color: "black",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  >
                    Sign in
                  </Box>
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </StyledContainer>
    </StyledSection>
  );
};

export default LoginSignUp;
