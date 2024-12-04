import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Authentication from "./Pages/Authentication";
import { ProtectedRoute } from "./Utils/ProtectedRoute";
import { AuthProvider } from "./Utils/AuthContext";
import { routes } from "./Utils/routes";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/resetPassword" element={<ResetPass />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Routes>
                  {routes.protected && routes.protected.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
