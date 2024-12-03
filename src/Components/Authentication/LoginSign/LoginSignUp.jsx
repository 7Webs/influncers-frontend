import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Checkbox, styled, Container, Paper, Stepper, Step, StepLabel, Grid, InputAdornment } from "@mui/material";
import { Instagram, YouTube, Twitter, Facebook } from "@mui/icons-material";

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
  gap: "20px",
  width: "500px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "0 20px",
  },
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

const steps = ['Personal Details', 'Social Media Profiles', 'Engagement Metrics'];

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tabButton1");
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    instagram: '',
    youtube: '',
    twitter: '',
    facebook: '',
    totalFollowers: '',
    avgEngagementRate: '',
    contentCategories: '',
    previousBrandDeals: '',
  });

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

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      navigate('/login');
    } else {
      handleNext();
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instagram Handle"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="YouTube Channel"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <YouTube />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Twitter Handle"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Twitter />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Facebook Page"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Total Followers (across all platforms)"
                name="totalFollowers"
                type="number"
                value={formData.totalFollowers}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Average Engagement Rate (%)"
                name="avgEngagementRate"
                type="number"
                value={formData.avgEngagementRate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Content Categories (comma separated)"
                name="contentCategories"
                value={formData.contentCategories}
                onChange={handleChange}
                helperText="e.g., Fashion, Beauty, Lifestyle"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Previous Brand Collaborations"
                name="previousBrandDeals"
                multiline
                rows={4}
                value={formData.previousBrandDeals}
                onChange={handleChange}
                helperText="List your previous brand collaborations (if any)"
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

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
              <StyledForm>
                <StyledTextField
                  type="email"
                  placeholder="Email address *"
                  required
                  fullWidth
                />
                <StyledTextField
                  type="password"
                  placeholder="Password *"
                  required
                  fullWidth
                />
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                  alignItems: "center"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox sx={{
                      color: "#e4e4e4",
                      "&.Mui-checked": {
                        color: "black",
                      }
                    }} />
                    <Typography sx={{ color: "#767676", fontSize: "14px" }}>
                      Remember me
                    </Typography>
                  </Box>
                  <Link to="/resetPassword" style={{ 
                    fontSize: "14px",
                    color: "black",
                    textDecoration: "none"
                  }}>
                    Lost password?
                  </Link>
                </Box>
                <StyledButton variant="contained" fullWidth>
                  Log In
                </StyledButton>
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
            <Container component="main" maxWidth="sm">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    Join Influencer Hub
                  </Typography>
                  <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, width: '100%' }}
                  >
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                      >
                        Back
                      </Button>
                      <Button type="submit" variant="contained">
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </Box>
                    {activeStep === 0 && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                          Already have an account? Sign in
                        </Link>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>
            </Container>
          )}
        </Box>
      </StyledContainer>
    </StyledSection>
  );
};

export default LoginSignUp;
