import React, { useEffect } from "react";
import AdditionalInfo from "../Components/Product/AdditonInfo/AdditionalInfo";
import Product from "../Components/Product/ProductMain/Product";
import RelatedProducts from "../Components/Product/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import { apiService } from "../Api/apiwrapper";
import { useQuery } from "@tanstack/react-query";
import AnimatedLoader from "../Components/Loaders/AnimatedLoader";
import Error from "../Components/Error/Error";
import { useAuth } from "../Utils/AuthContext";
const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const fetchDeals = async () => {
    const response = await apiService.get(`/deals/${id}`);
    return response.data;
  };

  const recordAnalytics = async () => {
    const response = await apiService.post(`/deals/analytics/${id}`, {
      dealId: id,
      userId: user?.id,
      type: "open",
    });
    return response.data;
  };

  useEffect(() => {
    if (user) {
      recordAnalytics();
    }
  }, [user]);

  // Use the `useQuery` hook
  const { data, isLoading, error } = useQuery({
    queryKey: ["deal", id],
    queryFn: fetchDeals,
    enabled: !!id, // Ensure the query only runs if `id` exists
  });

  if (isLoading) return;
  <AnimatedLoader />;

  if (error) return <Error />;

  return (
    <>
      <Product data={data} isLoading={isLoading} error={error} />
      <AdditionalInfo data={data} />
      {/* <RelatedProducts /> */}
    </>
  );
};

export default ProductDetails;
