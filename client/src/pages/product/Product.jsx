import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Applayout from "../../_components/layout/Applayout";
import { useProduct, useAddToCart } from "../../hooks/api";
import Loading from "../../_components/misc/Loading";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addToCart, loading: addingToCart } = useAddToCart();
  const { data, loading, error } = useProduct(id);

  // Extract product from API response
  const product = data?.product;

  // Demo images array (in real app, this would come from API)
  const images = [
    product?.image,
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  ];

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    await addToCart(
      { product: id, quantity },
      {
        onSuccess: () => toast.success(`Added ${quantity} item(s) to cart!`),
        onError: (error) => toast.error(error || "Failed to add to cart"),
      },
    );
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error or not found
  if (error || !product) {
    return (
      <Applayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error ? "Error Loading Product" : "Product Not Found"}
            </h2>
            <p className="text-gray-500 mb-4">
              {error || "The product you're looking for doesn't exist."}
            </p>
            <Link to="/products">
              <Button variant="outline">Back to Products</Button>
            </Link>
          </div>
        </div>
      </Applayout>
    );
  }

  return (
    <Applayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-violet-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-violet-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={`${images[selectedImage]}?w=800&q=80`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-violet-600"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={`${img}?w=200&q=75`}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand & Name */}
            <div>
              <span className="text-sm text-violet-600 font-medium uppercase tracking-wider">
                {product.brand}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount?.toLocaleString() || 0}{" "}
                reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </span>
              {product.price > 50 && (
                <span className="text-sm text-green-600 font-medium">
                  Free Shipping
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={product.inStock ? "text-green-600" : "text-red-600"}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || addingToCart}
                className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-6 text-lg font-medium"
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                onClick={handleWishlist}
                className={`p-6 ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`}
                />
              </Button>
              <Button variant="outline" className="p-6">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center text-center p-4">
                <Truck className="w-8 h-8 text-violet-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Free Delivery
                </span>
                <span className="text-xs text-gray-500">Orders over $50</span>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <RotateCcw className="w-8 h-8 text-violet-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Easy Returns
                </span>
                <span className="text-xs text-gray-500">30 day returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Shield className="w-8 h-8 text-violet-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Secure Payment
                </span>
                <span className="text-xs text-gray-500">100% protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              <button className="py-4 px-1 border-b-2 border-violet-600 text-violet-600 font-medium">
                Description
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                Reviews ({product.reviewCount || 0})
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                Shipping Info
              </button>
            </nav>
          </div>
          <div className="py-8">
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              {product.description}
              <br />
              <br />
              This product is crafted with attention to detail and quality.
              Perfect for everyday use and built to last. Experience premium
              quality and exceptional value with every purchase.
            </p>
          </div>
        </div>
      </div>
    </Applayout>
  );
};

export default ProductPage;
