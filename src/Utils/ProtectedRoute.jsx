import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AnimatedLoader from "../Components/Loaders/AnimatedLoader";
import { useEffect, useRef } from "react";
import EditProfile from "../Pages/EditProfilePage";
import { toast } from "react-toastify";
import WaitForApprovalScreen from "./WaitForApprovalScreen";

export const ProtectedRoute = ({ children }) => {
  const { user, loading, authChecked } = useAuth();
  const navigate = useNavigate();
  const hasShownToast = useRef(false); // Ref to track toast display

  useEffect(() => {
    if (authChecked && !loading && !user) {
      navigate("/");
    }
  }, [user, loading, authChecked, navigate]);

  useEffect(() => {
    if (
      user &&
      authChecked &&
      !loading &&
      !(
        user.facebookProfileLink ||
        user.instagramProfileLink ||
        user.twitterProfileLink ||
        user.linkedinProfileLink ||
        user.tiktokProfileLink ||
        user.youtubeProfileLink
      )
    ) {
      if (!hasShownToast.current) {
        toast.info(
          "Please add your social media links to be able to redeem deals"
        );
        hasShownToast.current = true; // Mark toast as shown
      }
    } else {
      hasShownToast.current = false; // Reset when condition changes
    }
  }, [user, authChecked, loading]);

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
    return <EditProfile />;
  }

  if (user.approved === false) {
    return (
      <>
        <WaitForApprovalScreen />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
