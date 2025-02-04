import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Avatar,
  TextField,
  Typography,
  Button,
  MenuItem,
  Grid,
  IconButton,
  styled,
  CircularProgress,
} from "@mui/material";
import { CameraAlt, Save } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useAuth } from "../Utils/AuthContext";
import { useCategory } from "../Utils/CategoryContext";

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#f8faff",
  paddingTop: "100px",
  paddingBottom: "50px",
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "24px",
  padding: "40px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: "4px solid #ffffff",
  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  margin: "auto",
  marginTop: -80,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8faff",
    "& fieldset": {
      borderColor: "#e1e8ff",
    },
    "&:hover fieldset": {
      borderColor: "#1E3FE4",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1E3FE4",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#666",
    "&.Mui-focused": {
      color: "#1E3FE4",
    },
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1E3FE4",
  color: "white",
  padding: "12px 32px",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#1733b7",
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff4444",
  color: "white",
  padding: "12px 32px",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#cc0000",
  },
}));

const CameraButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#1E3FE4",
  color: "white",
  padding: "8px",
  "&:hover": {
    backgroundColor: "#1733b7",
  },
}));

const EditProfile = () => {
  const { user, updateProfileInfo, logout } = useAuth();
  const { categories } = useCategory();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    gender: user?.gender || "",
    photo: user?.photo || "https://via.placeholder.com/150",
    categoryId: user?.categoryId || null,
    facebookProfileLink: user?.facebookProfileLink || "",
    instagramProfileLink: user?.instagramProfileLink || "",
    twitterProfileLink: user?.twitterProfileLink || "",
    linkedinProfileLink: user?.linkedinProfileLink || "",
    tiktokProfileLink: user?.tiktokProfileLink || "",
    youtubeProfileLink: user?.youtubeProfileLink || "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      Object.keys(profileData).forEach((key) => {
        if (user[key] !== profileData[key]) {
          formData.append(key, profileData[key]);
        }
      });

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      await updateProfileInfo(formData);
      navigate("/profile");
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="md">

        <ProfileCard>
          <Box position="relative">
            <ProfileAvatar src={profileData.photo} />
            <Box sx={{ position: "absolute", bottom: -60, right: "calc(50% - 80px)" }}>
              <CameraButton component="label" sx={{ position: "absolute", top: -90, left: -60}}>
                <CameraAlt fontSize="small" />
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoChange}
                />
              </CameraButton>
            </Box>
          </Box>

          <Typography variant="h5" align="center" sx={{ mt: 4, mb: 4, fontWeight: 600, color: "#333" }}>
            Edit Profile
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Full Name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Email"
                name="email"
                value={profileData.email}
                disabled
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Location"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </StyledTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                select
                label="Primary Domain"
                name="categoryId"
                value={profileData.categoryId}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img
                        src={category.image}
                        alt={category.name}
                        width={24}
                        height={24}
                      />
                      {category.name}
                    </Box>
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: "#333", fontWeight: 600 }}>
                Social Media Links
              </Typography>
            </Grid>

            {[
              { name: "facebookProfileLink", label: "Facebook Profile" },
              { name: "instagramProfileLink", label: "Instagram Profile" },
              { name: "twitterProfileLink", label: "Twitter Profile" },
              { name: "linkedinProfileLink", label: "LinkedIn Profile" },
              { name: "tiktokProfileLink", label: "TikTok Profile" },
              { name: "youtubeProfileLink", label: "YouTube Profile" },
            ].map((social) => (
              <Grid item xs={12} sm={6} key={social.name}>
                <StyledTextField
                  fullWidth
                  label={social.label}
                  name={social.name}
                  value={profileData[social.name]}
                  onChange={handleInputChange}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
            <SaveButton
              onClick={handleSubmit}
              disabled={isSubmitting}
              startIcon={!isSubmitting && <Save />}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
            </SaveButton>
            <LogoutButton onClick={handleLogout}>
              Logout
            </LogoutButton>
          </Box>
        </ProfileCard>
      </Container>
    </PageContainer>
  );
};

export default EditProfile;