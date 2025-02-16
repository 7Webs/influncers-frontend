import React, { useRef } from "react";
import ProductCard from "../Resuables/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiService } from "../../Api/apiwrapper";
import "../Home/Trendy/Trendy.css";
import { useParams } from "react-router-dom";
import { useCategory } from "../../Utils/CategoryContext";
import { CircularProgress } from "@mui/material";
import SkeletonLoader from "../Loaders/SkeletonLoader";

const Categories = () => {
  const { categoryId } = useParams();
  const loadMoreRef = useRef(null);
  const { categories } = useCategory();

  const categoryName =
    categories.find((cat) => cat.id === parseInt(categoryId))?.name || "";

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["categoryDeals", categoryId],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await apiService.get(
          `deals/top-deals?take=8&skip=${pageParam}&categoryId=${categoryId}`
        );
        return response.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 8 ? allPages.length * 8 : undefined;
      },
    });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
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
        <span>{categoryName}</span> Deals
      </h2>
      <div className="trendyMainContainer">
        {isFetching && !data
          ? // Show skeleton loader while initially fetching
            [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
          : allDeals.map((deal) => <ProductCard key={deal.id} deal={deal} />)}
      </div>
      <div
        ref={loadMoreRef}
        className="loading-trigger"
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        {(isFetchingNextPage || (isFetching && !isFetchingNextPage)) && (
          <CircularProgress />
        )}
        {!hasNextPage && <p>No hay más planes por ahora</p>}
      </div>
    </div>
  );
};

export default Categories;
