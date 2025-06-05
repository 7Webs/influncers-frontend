import React, { useState, useRef, useEffect } from "react";
import "./ShopDetails.css";
import axios from "axios";
import Filter from "../Filters/Filter";
import ProductCard from "../../Resuables/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiService } from "../../../Api/apiwrapper";

const ShopDetails = () => {
  const [filters, setFilters] = useState({ search: "", priceRange: [20, 69] });
  const loadMoreRef = useRef(null);

  // Fetch deals with filters and pagination
  const fetchDeals = async ({ pageParam = 0 }) => {
    const { search, priceRange } = filters;
    const response = await apiService.get("/deals/top-deals", {
      params: {
        take: 21,
        skip: pageParam,
        search,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      },
    });
    return response.data;
  };

  // Infinite query setup
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["deals", filters], // Unique key
      queryFn: fetchDeals,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 21 ? allPages.length * 21 : undefined;
      },
    });

  // Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentElement = loadMoreRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const allDeals = data?.pages.flat() || [];

  console.log(allDeals);

  return (
    <div className="shopDetails">
      <div className="shopDetailMain">
        {/* Filter Section */}
        <div className="shopDetails__left">
          <Filter onFilterChange={handleFilterChange} />
        </div>

        {/* Products Section */}
        <div className="shopDetails__right">
          <div className="shopDetailsProducts">
            <div className="shopDetailsProductsContainer">
              {isLoading ? (
                <p>Cargando...</p>
              ) : (
                allDeals.map((deal) =>
                  deal ? (
                    <ProductCard key={deal.id} deal={deal} />
                  ) : (
                    <p>Datos del producto no válidos</p>
                  )
                )
              )}
            </div>

            {/* Loading More Indicator */}
            {isFetchingNextPage && <p>Cargando más...</p>}

            {/* Infinite Scroll Trigger */}
            <div
              ref={loadMoreRef}
              style={{ height: 1, visibility: "hidden" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
