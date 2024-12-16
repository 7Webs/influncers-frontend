import React from "react";
import Lottie from "react-lottie";
import loadingData from "../../Assets/lottie/loader.json";
import { Box, CircularProgress } from "@mui/material";
const AnimatedLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress sx={{ color: "#000" }} />
    </Box>
  );
};

export default AnimatedLoader;
