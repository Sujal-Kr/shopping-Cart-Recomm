import React from "react";
import {
  AiFillAmazonSquare,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineProduct,
  AiOutlineLogout,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Search from "../modal/Search";
import { useLogout } from "../../hooks/api";
import { userNotExists } from "../../redux/slice/auth";
import { selectCartItemsCount } from "../../redux/slice/cart";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const { logout, loading: loggingOut } = useLogout();

  const handleLogout = async () => {
    await logout({
      onSuccess: () => {
        dispatch(userNotExists());
        toast.success("Logged out successfully");
        navigate("/");
      },
      onError: (error) => {
        toast.error(error || "Logout failed");
      },
    });
  };

  return (
    <div className="p-3 flex justify-between items-center border-b border-gray-100">
      <div className="flex gap-10 items-center">
        {/* logo */}
        <Link to="/" className="nav-icon flex gap-1 items-center">
          <AiFillAmazonSquare className="text-4xl text-violet-600" />
          <span className="text-2xl font-bold">
            Shop<span className="text-violet-600">Cart</span>
          </span>
        </Link>
        {/* nav items */}
        <div className="nav-items hidden md:flex gap-10">
          <Link
            to="/products"
            className="flex gap-2 items-center hover:text-violet-600 transition-colors"
          >
            <AiOutlineProduct className="text-xl" />
            <span>Products</span>
          </Link>
        </div>
      </div>

      {/* auth buttons */}
      <div className="action-btns flex gap-3 items-center">
        <Search />

        {/* Cart with badge */}
        <Link
          to="/cart"
          className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <AiOutlineShoppingCart className="text-2xl" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {cartItemsCount > 9 ? "9+" : cartItemsCount}
            </span>
          )}
        </Link>

        {user ? (
          // User dropdown menu
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-medium uppercase">
                  {user.name?.charAt(0) || "U"}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name || "User"}</span>
                  <span className="text-xs text-gray-500 font-normal">
                    {user.email}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                <AiOutlineUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/orders")}
                className="cursor-pointer"
              >
                <AiOutlineUnorderedList className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={loggingOut}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <AiOutlineLogout className="mr-2 h-4 w-4" />
                <span>{loggingOut ? "Logging out..." : "Logout"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <Button
              variant="outline"
              className="border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
