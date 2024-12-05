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
import Header from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Authentication />} />
              <Route path="/resetPassword" element={<ResetPass />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Header />
                  <Routes>
                    {routes.protected && routes.protected.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Routes>
                  <Footer />
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
