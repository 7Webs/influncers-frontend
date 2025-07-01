import React, { useRef, useEffect } from "react";
import {
    Typography,
    List,
    CircularProgress,
    Container
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiService } from "../../Api/apiwrapper";
import RedeemedDealCard from "../Resuables/RedeemedDealCard";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../Loaders/SkeletonLoader";

const RedeemedCoupons = () => {
    const loadMoreRef = useRef(null);
    const navigate = useNavigate();

    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ["redeemedDeals"],
            queryFn: async ({ pageParam = 0 }) => {
                const response = await apiService.get(
                    `/deals-redeem/user?take=10&skip=${pageParam}`
                );
                return response.data;
            },
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length === 10 ? allPages.length * 10 : undefined;
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

    const allRedeemedDeals = data?.pages.flat() || [];

    const handleDealClick = (dealId) => {
        navigate(`/redeemed-deals/${dealId}`);
    };

    return (
      <Container>
        <div style={{ mb: 3, paddingTop: '40px', boxShadow: 0.3 }}>
          {/* <CardContent> */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Ofertas Canjeadas
          </Typography>
          <List>
            {isFetching && !data
              ? [...Array(3)].map((_, index) => <SkeletonLoader key={index} />)
              : allRedeemedDeals.map((deal) => (
                  <div key={deal.id} onClick={() => handleDealClick(deal.id)}>
                    <RedeemedDealCard deal={deal} />
                  </div>
                ))}
          </List>
          <div
            ref={loadMoreRef}
            style={{ textAlign: "center", padding: "20px" }}
          >
            {isFetchingNextPage && <CircularProgress size={30} />}
            {!hasNextPage && (
              <Typography>No hay más planes por ahora</Typography>
            )}
            {isFetching && !isFetchingNextPage && (
              <CircularProgress size={30} />
            )}
          </div>
          {/* </CardContent> */}
        </div>
      </Container>
    );
};

export default RedeemedCoupons;
