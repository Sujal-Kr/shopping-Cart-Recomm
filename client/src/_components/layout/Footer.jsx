import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillHeart } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="text-xl font-bold text-gray-800">
              Shop<span className="text-violet-600">Cart</span>
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Your one-stop shopping destination
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-violet-600 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-violet-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-violet-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-violet-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <AiFillGithub className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <AiFillLinkedin className="text-xl" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500">
            <p>© {currentYear} ShopCart. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <AiFillHeart className="text-red-500" /> by{" "}
              <span className="font-medium text-gray-700">Sujal</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
