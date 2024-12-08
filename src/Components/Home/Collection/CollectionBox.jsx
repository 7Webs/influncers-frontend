import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const CollectionBox = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.list);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{
      padding: { xs: "0 20px", md: "0 60px", lg: "0 160px" },
      marginTop: "50px"
    }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category.id}>
            <Box sx={{
              position: "relative",
              height: "450px",
              width: "100%",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}>
              <Box
                component="img"
                src={category.image}
                alt={category.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)"
                  }
                }}
              />
              <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)"
                }
              }} />
              <Box sx={{
                position: "absolute",
                bottom: "40px",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                color: "white",
                zIndex: 2,
                width: "100%",
                padding: "0 20px"
              }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontSize: { xs: "26px", sm: "34px" }, 
                    fontWeight: 700, 
                    mb: 3,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  <Box component="span" sx={{ color: "#ff4d4d" }}>
                    {category.name}
                  </Box>
                  {" Collection"}
                </Typography>
                <Link 
                  to={`/shop/${category.slug}`}
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      color: "white",
                      fontSize: "15px",
                      fontWeight: 600,
                      padding: "14px 30px",
                      border: "2px solid white",
                      display: "inline-block",
                      transition: "all 0.3s ease",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        transform: "translateY(-2px)"
                      }
                    }}
                  >
                    Shop Now
                  </Box>
                </Link>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CollectionBox;
