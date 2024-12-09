import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  .slick-slide img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .slick-dots li button:before {
    color: #088e22; // Customize dot color
  }
`;

const Banner = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through slides
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Automatically transition slides
    autoplaySpeed: 3000, // Duration between transitions in ms
    arrows: true, // Show previous/next arrows
  };

  const banners = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/deal-promotional-banner-hanging-price-tag-style_1017-27325.jpg",
      alt: "Banner 1",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-vector/flash-sale-blue-banner-design_1017-31303.jpg",
      alt: "Banner 2",
    },
    {
      id: 3,
      image:
        "https://static.vecteezy.com/system/resources/previews/002/661/107/non_2x/weekend-deal-only-today-banner-sale-sales-background-with-gradient-shape-modern-advertising-illustration-vector.jpg",
      alt: "Banner 3",
    },
  ];

  return (
    <BannerContainer>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div
              style={{
                background: `url(${banner.image})`,
                minHeight: "600px",
                display: "block",
                backgroundPosition: "centre",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              &nbsp;
            </div>
          </div>
        ))}
      </Slider>
    </BannerContainer>
  );
};

export default Banner;
