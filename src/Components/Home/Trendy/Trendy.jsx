import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Resuables/ProductCard";
import "./Trendy.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiService } from "../../../Api/apiwrapper";
import { CircularProgress } from "@mui/material";
import SkeletonLoader from "../../Loaders/SkeletonLoader";

const Trendy = () => {
  const loadMoreRef = useRef(null);
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["deals"],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await apiService.get(
          `deals/top-deals?take=8&skip=${pageParam}`
        );
        return response.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 8 ? allPages.length * 8 : undefined;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px", // Load more content 200px before reaching the end
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allDeals = data?.pages.flat() || [];

  return (
    <div className="trendyProducts">
      <h2>
        <span>Planes</span> Para ti
      </h2>
      <div className="trendyMainContainer">
        {isFetching && !data
          ? // Show skeleton loader while initial data is being fetched
            Array(8)
              .fill(0)
              .map((_, index) => <SkeletonLoader key={index} />)
          : allDeals.map((deal) => <ProductCard key={deal.id} deal={deal} />)}
      </div>
      <div ref={loadMoreRef} className="loading-trigger">
        {isFetchingNextPage && <CircularProgress />}
        {!hasNextPage && <p>No hay más planes por ahora</p>}
        {isFetching && !isFetchingNextPage && <CircularProgress />}
      </div>
    </div>
  );
};

export default Trendy;
