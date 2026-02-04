import React, { useEffect, useMemo } from "react";
import Product from "../card/Product";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const ProductGrid = ({ heading, data, url = "/", limit = 5 }) => {
  // Limit products for faster initial load
  const products = useMemo(() => {
    return data;
  }, [data, limit]);


  return (
    <div className="px-6 py-16">
      <div className="flex justify-between py-4">
        <h3 className="text-lg ">{heading || "Our Products"}</h3>
        <Link to={url} className="flex gap-2 items-center">
          <span>View More</span>
          <RxDoubleArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {products?.map((product, index) => (
          <Product
            key={product._id || index}
            index={index}
            {...product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
