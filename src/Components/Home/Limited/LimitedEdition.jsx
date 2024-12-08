import React, { useEffect } from "react";
import "./LimitedEdition.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../../../redux/slice/dealsSlice";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ProductCard from "../../Resuables/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const LimitedEdition = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals?.list || []);
  const categories = useSelector((state) => state.category?.list || []);
  const [wishList, setWishList] = React.useState({});

  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleWishlistClick = (dealId) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [dealId]: !prevWishlist[dealId],
    }));
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  // Sort deals by closest end date and get top 4
  const sortedDeals = [...deals]
    .sort((a, b) => new Date(a.availableUntil) - new Date(b.availableUntil))
    .slice(0, 5);

  return (
    <>
      <div className="limitedProductSection">
        <h2>
          Limited <span>Edition</span>
        </h2>
        <div className="limitedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {sortedDeals.map((deal) => (
              <SwiperSlide key={deal.id}>
                <ProductCard
                  deal={deal}
                  getCategoryName={getCategoryName}
                  wishList={wishList}
                  onWishlistClick={handleWishlistClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LimitedEdition;
