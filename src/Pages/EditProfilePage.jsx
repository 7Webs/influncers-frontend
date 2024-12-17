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
} from "@mui/material";
import { CameraAlt, Save } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useAuth } from "../Utils/AuthContext";
import { useCategory } from "../Utils/CategoryContext";

// Styled Components
const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  margin: "auto",
  marginTop: -60,
}));

const EditProfile = () => {
  const { user, updateProfileInfo } = useAuth();
  const { categories } = useCategory();
  const navigate = useNavigate();

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
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData((prevData) => ({ ...prevData, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Dynamically append non-empty fields to FormData
      Object.keys(profileData).forEach((key) => {
        if (profileData[key]) {
          formData.append(key, profileData[key]);
        }
      });

      // Add the photo file separately if it's changed
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      await updateProfileInfo(formData);
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    }
  };

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="md">
        <Paper elevation={2} sx={{ p: 3, position: "relative" }}>
          <Box position="relative" sx={{ textAlign: "center" }}>
            <ProfileAvatar src={profileData.photo} />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 10,
                right: "calc(50% - 60px)",
                bgcolor: "white",
                border: "1px solid #ddd",
                "&:hover": { bgcolor: "gray" },
              }}
            >
              <CameraAlt fontSize="small" />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handlePhotoChange}
              />
            </IconButton>
          </Box>
          <Typography variant="h5" align="center" sx={{ mt: 6, mb: 3 }}>
            Edit Profile
          </Typography>
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={profileData.email}
                  disabled
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                  select
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              {/* Category Dropdown */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Primary Domain"
                  name="categoryId"
                  value={profileData.categoryId}
                  onChange={handleInputChange}
                  select
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      <img
                        src={category.image}
                        alt={category.name}
                        width={26}
                        height={26}
                        style={{ marginRight: 8 }}
                      />
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Social Media Links */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Facebook Profile Link"
                  name="facebookProfileLink"
                  value={profileData.facebookProfileLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Instagram Profile Link"
                  name="instagramProfileLink"
                  value={profileData.instagramProfileLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Twitter Profile Link"
                  name="twitterProfileLink"
                  value={profileData.twitterProfileLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="LinkedIn Profile Link"
                  name="linkedinProfileLink"
                  value={profileData.linkedinProfileLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tiktok Profile Link"
                  name="tiktokProfileLink"
                  value={profileData.tiktokProfileLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Youtube Profile Link"
                  name="youtubeProfileLink"
                  value={profileData.youtubeProfileLink}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSubmit}
                size="large"
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditProfile;
