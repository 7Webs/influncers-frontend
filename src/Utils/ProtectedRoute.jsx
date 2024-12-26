import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AnimatedLoader from "../Components/Loaders/AnimatedLoader";
import { useEffect } from "react";
import EditProfile from "../Pages/EditProfilePage";
import { toast } from "react-toastify";
import { Container } from "@mui/system";

export const ProtectedRoute = ({ children }) => {
  const { user, loading, authChecked } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authChecked && !loading && !user) {
      navigate("/");
    }
  }, [user, loading, authChecked, navigate]);

  if (!authChecked || loading) {
    return (
      <div>
        <AnimatedLoader />
      </div>
    );
  }

  if (
    !(
      user?.facebookProfileLink ||
      user?.instagramProfileLink ||
      user?.twitterProfileLink ||
      user?.linkedinProfileLink ||
      user?.tiktokProfileLink ||
      user?.youtubeProfileLink
    )
  ) {
    toast.info("Please add your social media links to be able to redeem deals");
    return <EditProfile />;
  }

  if (user.approved === false) {
    return (
      <>
        <Container
          maxWidth="lg"
          sx={{
            py: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Your account is not approved yet. Please wait for approval.
          </h2>
        </Container>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
