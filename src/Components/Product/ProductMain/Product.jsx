import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { PiShareNetworkLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./Product.css";
import { apiService } from "../../../Api/apiwrapper";
import { toast } from "react-toastify";

const Product = ({ data, isLoading, error }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const redeemDeal = async () => {
    try {
      // const formData = new FormData();
      // formData.append("dealId", data.id);
      const response = await apiService.post("/deals-redeem", {
        dealId: data.id,
      });
      toast.success("Deal redeemed successfully");
    } catch (error) {
      toast.error(error.response.data.message.toString());
      console.error("Error redeeming deal:", error);
    }
  };

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const productImg = data.images;

  const prevImg = () => {
    if (currentImg === 0) {
      setCurrentImg(productImg.length - 1);
    } else {
      setCurrentImg(currentImg - 1);
    }
  };

  const nextImg = () => {
    if (currentImg === productImg.length - 1) {
      setCurrentImg(0);
    } else {
      setCurrentImg(currentImg + 1);
    }
  };

  return (
    <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              {productImg.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  onClick={() => setCurrentImg(index)}
                  alt=""
                />
              ))}
            </div>
            <div className="productFullImg">
              <img src={productImg[currentImg]} alt="" />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Home</Link>&nbsp;/&nbsp;
                <Link to="/shop">Shop</Link>&nbsp;/&nbsp;
                {data.title}
              </div>
            </div>
            <div className="productName">
              <h1>{data.title}</h1>
            </div>

            <div className="productDescription">
              <p>{data.description}</p>
            </div>
            <div className="productSizeColor">
              <div className="productColor">
                <p>Max {data.maxPurchasePerUser} Redeemtion Per User</p>
              </div>
            </div>
            <div className="productCartQuantity">
              <div className="productCartBtn">
                <button onClick={() => redeemDeal()}>Redeem Now</button>
              </div>
            </div>
            <div className="productWishShare">
              <div className="productShare">
                <PiShareNetworkLight size={22} />
                <p>Share</p>
              </div>
            </div>
            <div className="productTags">
              <p>
                <span>Id: </span>
                {data.id}
              </p>
              <p>
                <span>Offered By: </span>
                {data.shop.name}
              </p>
              <p>
                <span>TAGS: </span>
                {data.keywords}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
