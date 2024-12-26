import React from "react";
import AdditionalInfo from "../Components/Product/AdditonInfo/AdditionalInfo";
import Product from "../Components/Product/ProductMain/Product";
import RelatedProducts from "../Components/Product/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import { apiService } from "../Api/apiwrapper";
import { useQuery } from "@tanstack/react-query";
import AnimatedLoader from "../Components/Loaders/AnimatedLoader";
import Error from "../Components/Error/Error";

const ProductDetails = () => {
  const { id } = useParams();

  const fetchDeals = async () => {
    const response = await apiService.get(`/deals/${id}`);
    return response.data;
  };

  // Use the `useQuery` hook
  const { data, isLoading, error } = useQuery({
    queryKey: ["deal", id],
    queryFn: fetchDeals,
    enabled: !!id, // Ensure the query only runs if `id` exists
  });

  if (isLoading) return
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
