import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Features/Cart/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ deal }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (deal) => {
    const dealInCart = cartItems.find((item) => item.id === deal.id);

    if (dealInCart && dealInCart.quantity >= 20) {
      toast.error("Deal limit reached", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    } else {
      dispatch(addToCart(deal));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    }
  };

  return (
    <div className="trendyProductContainer">
      <div className="trendyProductImages">
        <Link to="/Product" onClick={scrollToTop}>
          <img src={deal.images[0]} alt="" className="trendyProduct_front" />
          <img src={deal.images[0]} alt="" className="trendyProduct_back" />
        </Link>
        <h4 onClick={() => handleAddToCart(deal)}>Add to Cart</h4>
      </div>
      <div
        className="trendyProductImagesCart"
        onClick={() => handleAddToCart(deal)}
      >
        <FaCartPlus />
      </div>
      <div className="trendyProductInfo">
        {/* <div className="trendyProductCategoryWishlist">
          <p>{getCategoryName(deal.categoryId)}</p>
          <FiHeart
            onClick={() => onWishlistClick(deal.id)}
            style={{
              color: wishList[deal.id]
                ? "red"
                : "#767676",
              cursor: "pointer",
            }}
          />
        </div> */}
        <div className="trendyProductNameInfo">
          <Link to="product" onClick={scrollToTop}>
            <h5>
              <strong>{deal.title}</strong>
            </h5>
          </Link>
          <div>Available till: {deal.availableUntil}</div>
          <div>{deal.shortTagLine}</div>
          <div>
            By: <span style={{ color: "#07bc0c" }}>{deal.shop.name}</span>
          </div>

          {/* <div className="trendyProductRatingReviews">
            <div className="trendyProductRatingStar">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color="#FEC78A" size={10} />
              ))}
            </div>
            <span>5k+ reviews</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
