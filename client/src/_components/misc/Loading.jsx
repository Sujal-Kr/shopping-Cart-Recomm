import React from "react";
import { AiFillAmazonSquare } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-violet-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200 rounded-full opacity-30 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with bounce animation */}
        <div className="mb-8 animate-bounce">
          <div className="flex items-center gap-2">
            <AiFillAmazonSquare className="text-5xl text-violet-600" />
            <span className="text-3xl font-bold text-gray-900">
              Shop<span className="text-violet-600">Cart</span>
            </span>
          </div>
        </div>

        {/* Shopping bag animation */}
        <div className="relative mb-8">
          <div className="w-20 h-24 relative">
            {/* Bag body */}
            <div className="absolute bottom-0 w-20 h-16 bg-violet-600 rounded-b-2xl rounded-t-sm shadow-lg">
              {/* Bag shine */}
              <div className="absolute top-2 left-3 w-3 h-6 bg-violet-400 rounded-full opacity-50" />
            </div>

            {/* Bag handles */}
            <div className="absolute top-0 left-4 w-3 h-10 border-4 border-violet-600 rounded-t-full bg-transparent" />
            <div className="absolute top-0 right-4 w-3 h-10 border-4 border-violet-600 rounded-t-full bg-transparent" />

            {/* Floating items animation */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex gap-1">
                <span
                  className="text-xl animate-bounce"
                  style={{ animationDelay: "0ms" }}
                >
                  🛍️
                </span>
                <span
                  className="text-xl animate-bounce"
                  style={{ animationDelay: "150ms" }}
                >
                  👕
                </span>
                <span
                  className="text-xl animate-bounce"
                  style={{ animationDelay: "300ms" }}
                >
                  📱
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-linear-to-r from-violet-500 to-indigo-500 rounded-full animate-loading-bar" />
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Loading</span>
          <span className="flex gap-1">
            <span
              className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 bg-violet-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </span>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 text-sm mt-6">
          Finding the best deals for you...
        </p>
      </div>

      {/* Floating shopping icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          >
            {["🛒", "📦", "💳", "🎁", "⭐", "💜"][i]}
          </div>
        ))}
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 70%;
            margin-left: 0%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;
