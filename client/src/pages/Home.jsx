import { Button } from "@/components/ui/button";
import Applayout from "../_components/layout/Applayout";
import Hero from "../_components/specific/Hero";
import NewsLetter from "../_components/specific/NewsLetter";
import ProductGrid from "../_components/shared/ProductGrid";
import Category from "../_components/specific/Category";
import axios from "axios";
import { useEffect } from "react";
import { useProducts } from "../hooks/api";
const Home = () => {
  const { data, error, isLoading } = useProducts({ limit: 5 });

  return (
    <Applayout>
      <Hero />
      <Category />
      <ProductGrid data={data?.products} url="/products" isLoading={isLoading} />
      <NewsLetter />
    </Applayout>
  );
};

export default Home;
