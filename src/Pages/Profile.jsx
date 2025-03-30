import React from "react";
import { useAuth } from "../Utils/AuthContext";
import {
  Box,
  Container,
  Avatar,
  Typography,
  Button,
  Grid,
  styled,
  Card,
  CardContent,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
  Edit,
  LocationOn,
  Phone,
  Email,
  Person,
  Category,
} from "@mui/icons-material";
import { FaTiktok } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
  position: "relative",
  overflow: "hidden",
}));

const CoverPhoto = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "200px",
  background: "linear-gradient(135deg, #1E3FE4 0%, #1733b7 100%)",
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: "4px solid #ffffff",
  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
  margin: "120px auto 20px",
  position: "relative",
  zIndex: 1,
}));

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1E3FE4",
  color: "white",
  padding: "8px 24px",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#1733b7",
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff4444",
  color: "white",
  padding: "8px 24px",
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#cc0000",
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "16px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
  backgroundColor: "#ffffff",
}));

const SocialButton = styled(IconButton)(({ color }) => ({
  backgroundColor: color,
  color: "white",
  "&:hover": {
    backgroundColor: color,
    opacity: 0.9,
  },
  margin: 4,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px",
  "& .MuiSvgIcon-root": {
    color: "#1E3FE4",
  },
}));

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const socialLinks = [
    { Icon: Facebook, color: "#3b5998", link: user?.facebookProfileLink },
    { Icon: Instagram, color: "#E1306C", link: user?.instagramProfileLink },
    { Icon: Twitter, color: "#1DA1F2", link: user?.twitterProfileLink },
    { Icon: LinkedIn, color: "#0077b5", link: user?.linkedinProfileLink },
    { Icon: FaTiktok, color: "#000000", link: user?.tiktokProfileLink },
    { Icon: YouTube, color: "#FF0000", link: user?.youtubeProfileLink },
  ];

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <ProfileCard>
          <CoverPhoto />
          <ProfileAvatar src={user?.photo || "https://via.placeholder.com/150"}>
            {!user?.photo && (user?.name?.[0] || "U")}
          </ProfileAvatar>

          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              {user?.name || "User Name"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {user?.category?.name + " Influencer" || "General User"}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}
            >
              <EditButton
                startIcon={<Edit />}
                onClick={() => navigate("/profile/edit")}
              >
                Edit Profile
              </EditButton>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <InfoCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  <InfoItem>
                    <Person />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Full Name
                      </Typography>
                      <Typography>{user?.name || "Not provided"}</Typography>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <Email />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography>{user?.email || "Not provided"}</Typography>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <Phone />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography>{user?.phone || "Not provided"}</Typography>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <LocationOn />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography>
                        {user?.location || "Not provided"}
                      </Typography>
                    </Box>
                  </InfoItem>
                  <InfoItem>
                    <Category />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Category
                      </Typography>
                      <Typography>
                        {user?.category?.name || "Not specified"}
                      </Typography>
                    </Box>
                  </InfoItem>
                </CardContent>
              </InfoCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <InfoCard>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Social Media Profiles
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {socialLinks.map(
                      ({ Icon, color, link }, index) =>
                        link && (
                          <SocialButton
                            key={index}
                            href={link}
                            target="_blank"
                            color={color}
                            size="large"
                          >
                            {typeof Icon === "function" ? (
                              <Icon />
                            ) : (
                              <Icon size={24} />
                            )}
                          </SocialButton>
                        )
                    )}
                  </Box>
                  {!socialLinks.some((link) => link.link) && (
                    <Typography color="text.secondary" sx={{ mt: 2 }}>
                      No social media profiles linked yet
                    </Typography>
                  )}
                </CardContent>
              </InfoCard>
            </Grid>
          </Grid>
        </ProfileCard>
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          marginTop: "20px",
        }}
      >
        <LogoutButton
          onClick={() =>
            (window.location.href = "https://form.typeform.com/to/yBk5HCUE")
          }
        >
          Delete Your Account
        </LogoutButton>
      </div>
    </PageContainer>
  );
};

export default Profile;
