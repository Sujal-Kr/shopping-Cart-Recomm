import React from "react";
import { Link } from "react-router-dom";
import { AiFillAmazonSquare } from "react-icons/ai";
import { HiHome, HiShoppingBag, HiArrowLeft } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-violet-50 via-white to-indigo-50 relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <Link
          to="/"
          className="mb-8 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center gap-2">
            <AiFillAmazonSquare className="text-4xl text-violet-600" />
            <span className="text-2xl font-bold text-gray-900">
              Shop<span className="text-violet-600">Cart</span>
            </span>
          </div>
        </Link>

        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-600 leading-none select-none animate-pulse-slow">
            404
          </div>

          {/* Floating shopping elements around 404 */}
          <div
            className="absolute -top-4 left-0 text-3xl animate-float"
            style={{ animationDelay: "0s" }}
          >
            🛒
          </div>
          <div
            className="absolute top-8 -right-4 text-2xl animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            📦
          </div>
          <div
            className="absolute bottom-8 -left-8 text-2xl animate-float"
            style={{ animationDelay: "1s" }}
          >
            🛍️
          </div>
          <div
            className="absolute -bottom-2 right-0 text-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            💳
          </div>
        </div>

        {/* Error message */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
            The page you're looking for seems to have wandered off into the
            shopping mall. Let's get you back on track!
          </p>
        </div>

        {/* Decorative broken bag illustration */}
        <div className="mb-8 relative">
          <div className="w-24 h-28 relative opacity-60">
            {/* Bag body with "broken" look */}
            <div className="absolute bottom-0 w-24 h-20 bg-gray-300 rounded-b-2xl rounded-t-sm shadow-inner">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-3xl">
                ?
              </div>
            </div>
            {/* Bag handles */}
            <div className="absolute top-0 left-5 w-3 h-12 border-4 border-gray-300 rounded-t-full bg-transparent" />
            <div className="absolute top-0 right-5 w-3 h-12 border-4 border-gray-300 rounded-t-full bg-transparent" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
          >
            <HiHome className="text-xl" />
            Go Home
          </Link>
          <Link
            to="/products"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-violet-600 font-semibold rounded-xl border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 hover:scale-105 transition-all duration-300 shadow-md"
          >
            <HiShoppingBag className="text-xl" />
            Browse Products
          </Link>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 flex items-center gap-2 text-gray-500 hover:text-violet-600 transition-colors duration-300 group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Go Back</span>
        </button>
      </div>

      {/* Floating icons in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-10 animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.3}s`,
            }}
          >
            {["🛒", "📦", "💳", "🎁", "⭐", "💜", "🏷️", "👕"][i]}
          </div>
        ))}
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
