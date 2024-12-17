import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AnimatedLoader from "../Components/Loaders/AnimatedLoader";
import { useEffect } from "react";

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

    return children;
};

export default ProtectedRoute;
