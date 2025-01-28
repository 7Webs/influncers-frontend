import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Authentication from "./Pages/Authentication";
import { ProtectedRoute } from "./Utils/ProtectedRoute";
import { AuthProvider } from "./Utils/AuthContext";
import { routes } from "./Utils/routes";
import { Provider } from "react-redux";
import store from "./redux/Store";
import Footer from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderMain from "./Components/Header/Header";
import { CategoryProvider } from "./Utils/CategoryContext";
import { ShopProvider } from "./Utils/ShopContext";

// 404 Component
const NotFound = () => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <img
        src="https://tailwindflex.com/storage/thumbnails/minimal-404-page/thumb_u.min.webp?v=1"
        alt="404 Not Found"
        style={styles.image}
      />
    </div>
  );
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Provider store={store}>
          <ShopProvider>
            <CategoryProvider>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Authentication />} />
                  <Route path="/resetPassword" element={<ResetPass />} />
                  <Route
                    path="/*"
                    element={
                      <ProtectedRoute>
                        <HeaderMain />
                        <Routes>
                          {routes.protected &&
                            routes.protected.map((route) => (
                              <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                              />
                            ))}
                          {/* Catch-all route for protected routes */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer />
                      </ProtectedRoute>
                    }
                  />
                  {/* Catch-all route for public routes */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </CategoryProvider>
          </ShopProvider>
        </Provider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
    </>
  );
};

export default App;
