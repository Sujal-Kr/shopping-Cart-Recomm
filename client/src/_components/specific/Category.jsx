import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineLaptop,
  AiOutlineSkin,
  AiOutlineHome,
  AiOutlineCar,
  AiOutlineGift,
  AiOutlineBook,
} from "react-icons/ai";
import { BiFootball, BiBrain } from "react-icons/bi";
import { GiClothes, GiLipstick } from "react-icons/gi";
import { MdOutlineToys, MdOutlineKitchen } from "react-icons/md";

const categories = [
  {
    name: "Electronics",
    icon: AiOutlineLaptop,
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:bg-blue-600 hover:text-white",
  },
  {
    name: "Fashion",
    icon: GiClothes,
    color: "bg-pink-100 text-pink-600",
    hoverColor: "hover:bg-pink-600 hover:text-white",
  },
  {
    name: "Sports",
    icon: BiFootball,
    color: "bg-green-100 text-green-600",
    hoverColor: "hover:bg-green-600 hover:text-white",
  },
  {
    name: "Beauty",
    icon: GiLipstick,
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:bg-purple-600 hover:text-white",
  },
  {
    name: "Home & Living",
    icon: AiOutlineHome,
    color: "bg-amber-100 text-amber-600",
    hoverColor: "hover:bg-amber-600 hover:text-white",
  },
  {
    name: "Books",
    icon: AiOutlineBook,
    color: "bg-indigo-100 text-indigo-600",
    hoverColor: "hover:bg-indigo-600 hover:text-white",
  },
  {
    name: "Toys & Games",
    icon: MdOutlineToys,
    color: "bg-red-100 text-red-600",
    hoverColor: "hover:bg-red-600 hover:text-white",
  },
  {
    name: "Kitchen",
    icon: MdOutlineKitchen,
    color: "bg-teal-100 text-teal-600",
    hoverColor: "hover:bg-teal-600 hover:text-white",
  },
  {
    name: "Automotive",
    icon: AiOutlineCar,
    color: "bg-slate-100 text-slate-600",
    hoverColor: "hover:bg-slate-600 hover:text-white",
  },
  {
    name: "Gifts",
    icon: AiOutlineGift,
    color: "bg-rose-100 text-rose-600",
    hoverColor: "hover:bg-rose-600 hover:text-white",
  },
];

const Category = () => {
  return (
    <section className="px-6 py-12 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Shop by Category
        </h2>
        <p className="text-gray-500 mt-2">
          Explore our wide range of categories
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 cursor-pointer group ${category.color} ${category.hoverColor}`}
            >
              <IconComponent className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium text-center">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
