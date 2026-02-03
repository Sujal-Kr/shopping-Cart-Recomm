import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

import Applayout from "../../_components/layout/Applayout";
import Product from "../../_components/card/Product";
import { useProducts } from "../../hooks/api";

// Skeleton component for loading state
const ProductSkeleton = () => (
  <Card className="overflow-hidden border border-gray-200">
    <div className="h-48 bg-gray-200 animate-pulse" />
    <CardContent className="p-4 space-y-3">
      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
        <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </CardContent>
  </Card>
);

// Empty state component
const NoProducts = ({ searchQuery }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <Package className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No products found
    </h3>
    <p className="text-gray-500 text-center max-w-md">
      {searchQuery
        ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or filters.`
        : "There are no products available at the moment. Please check back later."}
    </p>
  </div>
);

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Beauty",
  "Home & Living",
  "Books",
  "Toys & Games",
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const ITEMS_PER_PAGE = 8;

// Convert sortBy to API format
const getSortParams = (sortBy) => {
  switch (sortBy) {
    case "price-low":
      return { sortField: "price", sortDirection: 1 };
    case "price-high":
      return { sortField: "price", sortDirection: -1 };
    case "rating":
      return { sortField: "rating", sortDirection: -1 };
    case "newest":
      return { sortField: "createdAt", sortDirection: -1 };
    default:
      return { sortField: "createdAt", sortDirection: -1 };
  }
};

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "featured");
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  // Build API params
  const sortParams = getSortParams(sortBy);
  const apiParams = {
    page,
    limit: ITEMS_PER_PAGE,
    ...sortParams,
  };
  if (searchQuery) apiParams.search = searchQuery;
  if (category && category !== "All") apiParams.category = category;

  // Call API
  const { data, loading } = useProducts(apiParams);

  // When filters change, reset to page 1
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category, sortBy]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (category !== "All") params.set("category", category);
    if (sortBy !== "featured") params.set("sort", sortBy);
    if (page > 1) params.set("page", page.toString());
    setSearchParams(params);
  }, [searchQuery, category, sortBy, page, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (data?.hasMore) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const products = data?.products || [];
  const totalPages = data?.totalPages || 0;

  return (
    <Applayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-500">
            Discover our collection of premium products
            {data?.totalCount > 0 && (
              <span className="ml-2 text-sm bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                {data.totalCount} products
              </span>
            )}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-5 bg-white"
              />
            </div>
          </form>

          {/* Category Filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48 py-5 bg-white">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 py-5 bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(searchQuery || category !== "All") && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-2">
                Search: {searchQuery}
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-violet-900"
                >
                  ×
                </button>
              </span>
            )}
            {category !== "All" && (
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-2">
                {category}
                <button
                  onClick={() => setCategory("All")}
                  className="hover:text-violet-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          {loading ? (
            // Loading skeletons
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length === 0 ? (
            // No products
            <NoProducts searchQuery={searchQuery} />
          ) : (
            // Products list
            products.map((product, index) => (
              <Product
                key={product._id || `${product.name}-${index}`}
                index={index}
                id={product._id}
                {...product}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2">
              <Button
                onClick={handlePreviousPage}
                disabled={page === 1}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={!data?.hasMore}
                variant="outline"
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              Page {page} {totalPages > 0 && `of ${totalPages}`}
            </div>
          </div>
        )}
      </div>
    </Applayout>
  );
};

export default ProductListing;
