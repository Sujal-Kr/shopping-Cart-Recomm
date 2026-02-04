import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Applayout from "../../_components/layout/Applayout";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../redux/slice/cart";
import { useClearCart } from "../../hooks/api";

// Empty cart component
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <ShoppingBag className="w-16 h-16 text-gray-400" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
      Your cart is empty
    </h2>
    <p className="text-gray-500 text-center max-w-md mb-8">
      Looks like you haven't added anything to your cart yet. Start shopping to
      fill it up!
    </p>
    <Link to="/products">
      <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6">
        <ShoppingBag className="w-5 h-5 mr-2" />
        Browse Products
      </Button>
    </Link>
  </div>
);

// Cart item component
const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  const optimizedImage = item.image?.includes("unsplash.com")
    ? `${item.image}?w=200&q=75`
    : item.image;

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link to={`/product/${item.index || 0}`} className="shrink-0">
            <img
              src={optimizedImage}
              alt={item.name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
            />
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <span className="text-xs text-violet-600 font-medium uppercase">
                  {item.brand}
                </span>
                <Link to={`/product/${item.index || 0}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-violet-600 transition-colors truncate">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  ${item.price?.toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => onRemove(item.name)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => onDecrement(item.name)}
                  className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onIncrement(item.name)}
                  className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Item Total */}
              <span className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const { clearCart: clearCartAPI } = useClearCart();

  const handleIncrement = (productName) => {
    dispatch(incrementQuantity(productName));
  };

  const handleDecrement = (productName) => {
    dispatch(decrementQuantity(productName));
  };

  const handleRemove = (productName) => {
    dispatch(removeFromCart(productName));
    toast.success("Item removed from cart");
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    clearCartAPI(
      {
        onSuccess: () => toast.success("Cart cleared"),
        onError: (error) => toast.error(error || "Failed to clear cart"),
      },
    );
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const shipping = cartTotal >= 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  return (
    <Applayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Link
                to="/products"
                className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>

              {cartItems.map((item, index) => (
                <CartItem
                  key={`${item.name}-${index}`}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-gray-500">
                        Add ${(50 - cartTotal).toFixed(2)} more for free
                        shipping
                      </p>
                    )}

                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Link to="/checkout" className="block">
                    <Button className="w-full mt-6 bg-violet-600 hover:bg-violet-700 text-white py-6 text-lg font-medium">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl">🔒</span>
                      <span className="text-xs text-gray-500">
                        Secure Checkout
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl">🚚</span>
                      <span className="text-xs text-gray-500">
                        Fast Delivery
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl">↩️</span>
                      <span className="text-xs text-gray-500">
                        Easy Returns
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Applayout>
  );
};

export default Cart;
