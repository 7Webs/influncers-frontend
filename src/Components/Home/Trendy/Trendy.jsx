import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Resuables/ProductCard";
import "./Trendy.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiService } from "../../../Api/apiwrapper";


const Trendy = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["deals"], // Unique key for this query
      queryFn: async ({ pageParam = 0 }) => {
        const response = await apiService.get(
          `deals/top-deals?take=21&skip=${pageParam}`
        );
        return response.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        // Determine the next page parameter
        return lastPage.length === 21 ? allPages.length * 21 : undefined;
      },
    });


  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, fetchNextPage]);

  const allDeals = data?.pages.flat() || [];

  return (
    <div className="trendyProducts">
      <h2>
        <span>Deals</span> Only For You
      </h2>
      <div className="trendyMainContainer">
        {allDeals.map((deal) => (
          <ProductCard key={deal.id} deal={deal} />
        ))}
      </div>
      {isFetching && <p>Loading...</p>}
      {!hasNextPage && <p>No more deals to load</p>}
    </div>
  );
};

export default Trendy;