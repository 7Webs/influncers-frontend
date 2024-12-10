import { Container } from "@mui/material";
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
        "https://www.shutterstock.com/image-vector/colorful-discount-sale-podium-special-600nw-2055955985.jpg",
      alt: "Banner 1",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8mKTv0PVVbJXwcNFS0u5norbuLK2FmMupNxV5bpwYSxwGS6REdRxsPZtn21JObLfawVQ&usqp=CAU",
      alt: "Banner 2",
    },
    {
      id: 3,
      image:
        "https://cdn.prod.website-files.com/5e26b9545f16d0434143dd15/65f93f174c46545a05c3448a_65321ee7caf2102b4ad2d3c0_black-friday.svg",
      alt: "Banner 3",
    },
  ];

  return (
    <BannerContainer>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <Container maxWidth="xl">
              <div
                style={{
                  background: `url(${banner.image})`,
                  minHeight: "520px",
                  display: "block",
                  backgroundPosition: "centre",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "16px",
                  border: "1px solid #000",
                }}
              >
                &nbsp;
              </div>
            </Container>
          </div>
        ))}
      </Slider>
    </BannerContainer>
  );
};

export default Banner;
