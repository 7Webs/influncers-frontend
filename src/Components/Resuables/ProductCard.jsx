import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ deal }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nav = useNavigate();

  return (
    <div className="trendyProductContainer">
      <div className="trendyProductImages">
        <Link to={"/product/" + deal.id} onClick={scrollToTop}>
          <img src={deal.images[0]} alt="" className="trendyProduct_front" />
          <img src={deal.images[0]} alt="" className="trendyProduct_back" />
        </Link>
        <h4
          onClick={() => {
            nav("/product/" + deal.id);
            scrollToTop();
          }}
        >
          View Details
        </h4>
      </div>
      <div className="trendyProductInfo">
        <div className="trendyProductNameInfo">
          <Link to={"/product/" + deal.id} onClick={scrollToTop}>
            <h5>
              <strong>{deal.title}</strong>
            </h5>
          </Link>
          <div>Available till: {deal.availableUntil}</div>
          <div>{deal.shortTagLine}</div>
          <div>
            By: <span style={{ color: "#07bc0c" }}>{deal.shop.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
