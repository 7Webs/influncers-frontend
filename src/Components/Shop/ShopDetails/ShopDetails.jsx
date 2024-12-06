import React, { useState, useEffect } from "react";
import "./ShopDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../../../redux/slice/dealsSlice";
import { fetchCategory } from "../../../redux/slice/categorySlice";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import ProductCard from "../../Resuables/ProductCard";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals?.list || []);
  const categories = useSelector((state) => state.category?.list || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    const query = `take=${itemsPerPage}&skip=${skip}`;
    dispatch(fetchDeals(null, query));
    dispatch(fetchCategory());
  }, [dispatch, currentPage]);

  const handleWishlistClick = (dealId) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [dealId]: !prevWishlist[dealId],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };


  const totalPages = Math.ceil(deals.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select name="sort" id="sort">
                  <option value="default">Default Sorting</option>
                  <option value="Featured">Featured</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, Low to high</option>
                  <option value="highToLow">Price, high to low</option>
                  <option value="oldToNew">Date, old to new</option>
                  <option value="newToOld">Date, new to old</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {deals.map((deal) => (
                  <ProductCard
                    key={deal.id}
                    deal={deal}
                    getCategoryName={getCategoryName}
                    wishList={wishList}
                    onWishlistClick={handleWishlistClick}
                  />
                ))}
              </div>
            </div>
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                {currentPage > 1 && (
                  <p onClick={() => handlePageChange(currentPage - 1)}>
                    <FaAngleLeft />
                    Prev
                  </p>
                )}
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  {[...Array(totalPages)].map((_, index) => (
                    <p
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      style={{
                        fontWeight: currentPage === index + 1 ? 'bold' : 'normal'
                      }}
                    >
                      {index + 1}
                    </p>
                  ))}
                </div>
              </div>
              <div className="sdPaginationNext">
                {currentPage < totalPages && (
                  <p onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                    <FaAngleRight />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
