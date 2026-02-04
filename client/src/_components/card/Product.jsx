import React, { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addToCart as addToCartAction } from "../../redux/slice/cart";
import { useAddToCart } from "../../hooks/api";

const Product = ({
  _id,
  index,
  name,
  image,
  rating,
  price,
  reviewCount,
  brand,
  inStock,
  description,
  ...rest
}) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart: addToCartAPI } = useAddToCart();

  
  const handleAddToCart = async (product) => {
    // Add to Redux cart (local state)
    dispatch(
      addToCartAction({
        product: {
          _id: product._id,
          name: product.name,
          image: product.image,
          rating: product.rating,
          price: product.price,
          reviewCount: product.reviewCount,
          brand: product.brand,
          inStock: product.inStock,
          description: product.description,
        },
        quantity: 1,
      }),
    );

    // Add to backend cart (API)
    await addToCartAPI(
      { product: product._id, quantity: 1 },
      {
        onSuccess: () => toast.success(`${product.name} added to cart!`),
        onError: (error) => toast.error(error || "Failed to add to cart"),
      },
    );
  };

  

  // Optimize Unsplash images - request smaller size
  const optimizedImage = image?.includes("unsplash.com")
    ? `${image}?w=400&q=75&auto=format`
    : image;

  // Generate star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-yellow-400/50 text-yellow-400"
          />,
        );
      } else {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card className="group overflow-hidden border bg-amber-50/10 border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <Link
        to={`/product/${_id}`}
        className="block relative overflow-hidden bg-gray-100 h-48"
      >
        {/* Skeleton loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-3 border-gray-300 border-t-violet-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Image with lazy loading */}
        <img
          src={optimizedImage}
          alt={name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image unavailable</span>
          </div>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-red-500 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <CardContent className="p-4">
        {/* Brand */}
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {brand}
        </span>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mt-1 line-clamp-2 min-h-10">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-xs text-gray-500">
            ({reviewCount?.toLocaleString()})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${price?.toFixed(2)}
          </span>
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-full h-9 w-9 p-0"
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart({
                _id,
                name,
                image,
                rating,
                price,
                reviewCount,
                brand,
                inStock,
                description,
              });
            }}
          >
            <AiOutlineShoppingCart className="text-lg" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;
