import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Edit as EditIcon,
  PhotoCamera as CameraIcon,
  Save as SaveIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

// Mock user data
const mockUserData = {
  id: '123',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Lifestyle and fashion influencer passionate about sustainable fashion and mindful living. Sharing daily inspiration and tips for a balanced life.',
  location: 'San Francisco, CA',
  profileImage: 'https://example.com/profile.jpg',
  socialMedia: {
    instagram: {
      handle: '@sarahj_lifestyle',
      followers: 15000,
      url: 'https://instagram.com/sarahj_lifestyle',
      verified: true,
    },
    youtube: {
      handle: 'SarahJLifestyle',
      subscribers: 25000,
      url: 'https://youtube.com/c/SarahJLifestyle',
      verified: true,
    },
    tiktok: {
      handle: '@sarahj_life',
      followers: 10000,
      url: 'https://tiktok.com/@sarahj_life',
      verified: false,
    },
  },
  categories: ['Fashion', 'Lifestyle', 'Wellness'],
  engagement: {
    avgLikes: 1200,
    avgComments: 45,
    engagementRate: '8.5%',
  },
};

const Profile = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [socialLinkDialog, setSocialLinkDialog] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserData(editedData);
    setIsEditing(false);
    setIsLoading(false);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleChange = (field) => (event) => {
    setEditedData({
      ...editedData,
      [field]: event.target.value,
    });
  };

  const handleSocialMediaEdit = (platform) => {
    setSelectedPlatform(platform);
    setSocialLinkDialog(true);
  };

  const handleSocialMediaSave = () => {
    // TODO: Implement social media verification logic
    setSocialLinkDialog(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // TODO: Implement actual image upload logic
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedData({
          ...editedData,
          profileImage: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Profile Management
      </Typography>

      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={editedData.profileImage}
                  sx={{ width: 120, height: 120, mb: 2, mx: 'auto' }}
                />
                {isEditing && (
                  <IconButton
                    color="primary"
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    <CameraIcon />
                  </IconButton>
                )}
              </Box>

              <Typography variant="h5" gutterBottom>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {userData.location}
              </Typography>

              <Box sx={{ mt: 2, mb: 3 }}>
                {userData.categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    size="small"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>

              {!isEditing ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  fullWidth
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                    onClick={handleSave}
                    disabled={isLoading}
                    fullWidth
                  >
                    Save
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={isEditing ? editedData.firstName : userData.firstName}
                    onChange={handleChange('firstName')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={isEditing ? editedData.lastName : userData.lastName}
                    onChange={handleChange('lastName')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={isEditing ? editedData.email : userData.email}
                    onChange={handleChange('email')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={isEditing ? editedData.phone : userData.phone}
                    onChange={handleChange('phone')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={isEditing ? editedData.location : userData.location}
                    onChange={handleChange('location')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    value={isEditing ? editedData.bio : userData.bio}
                    onChange={handleChange('bio')}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Social Media Profiles
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(userData.socialMedia).map(([platform, data]) => (
                  <Grid item xs={12} sm={6} md={4} key={platform}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          {platform === 'instagram' && <InstagramIcon color="action" />}
                          {platform === 'youtube' && <YouTubeIcon color="action" />}
                          {platform === 'tiktok' && <LinkIcon color="action" />}
                          <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                            {platform}
                          </Typography>
                          {data.verified && (
                            <Chip
                              label="Verified"
                              size="small"
                              color="success"
                              sx={{ ml: 'auto' }}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {data.handle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {platform === 'youtube' ? 
                            `${(data.subscribers / 1000).toFixed(1)}K subscribers` :
                            `${(data.followers / 1000).toFixed(1)}K followers`}
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleSocialMediaEdit(platform)}
                          sx={{ mt: 1 }}
                        >
                          Update
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Engagement Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Average Likes
                      </Typography>
                      <Typography variant="h6">
                        {userData.engagement.avgLikes.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Average Comments
                      </Typography>
                      <Typography variant="h6">
                        {userData.engagement.avgComments.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Engagement Rate
                      </Typography>
                      <Typography variant="h6">
                        {userData.engagement.engagementRate}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Social Media Link Dialog */}
      <Dialog open={socialLinkDialog} onClose={() => setSocialLinkDialog(false)}>
        <DialogTitle>Update {selectedPlatform} Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Profile URL"
            placeholder={`https://${selectedPlatform}.com/...`}
            sx={{ mt: 2, mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
          <Alert severity="info">
            We'll verify your profile to ensure accurate follower counts and engagement rates.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSocialLinkDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSocialMediaSave}>
            Verify & Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
