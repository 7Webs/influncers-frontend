import React, { useState, useEffect } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDeals } from "../../../redux/slice/dealsSlice";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import ProductCard from "../../Resuables/ProductCard";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");
  const [wishList, setWishList] = useState({});
  const deals = useSelector((state) => state.deals?.list || []);
  const categories = useSelector((state) => state.category?.list || []);

  useEffect(() => {
    const query = `take=10&skip=0`;
    dispatch(fetchDeals(null, query));
    dispatch(fetchCategory());
  }, [dispatch]);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWishlistClick = (id) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [id]: !prevWishlist[id],
    }));
  };

  const getDealsForTab = () => {
    switch(activeTab) {
      case "tab2":
        return deals.slice().reverse();
      default:
        return deals;
    }
  };

  return (
    <>
      <div className="trendyProducts">
        <h2>
          Our Trendy <span>Deals</span>
        </h2>
        <div className="trendyTabs">
          <div className="tabs">
            {[
              { id: "tab1", label: "All" },
              { id: "tab2", label: "New Arrivals" },
              { id: "tab3", label: "Best Seller" },
              { id: "tab4", label: "Top Rated" }
            ].map(tab => (
              <p
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={activeTab === tab.id ? "active" : ""}
              >
                {tab.label}
              </p>
            ))}
          </div>
          <div className="trendyTabContent">
            {activeTab && (
              <div className="trendyMainContainer">
                {getDealsForTab().map(deal => (
                  <ProductCard
                    key={deal.id}
                    deal={deal}
                    getCategoryName={getCategoryName}
                    wishList={wishList}
                    onWishlistClick={handleWishlistClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="discoverMore">
          <Link to="/shop" onClick={scrollToTop}>
            <p>Discover More</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Trendy;
