import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ProtectRoute from "./_components/auth/ProtectRoute";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/slice/auth";
import Loading from "./_components/misc/Loading";

// Lazy loading components

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const ProductPage = lazy(() => import("./pages/product/Product"));
const ProductListing = lazy(() => import("./pages/product/ProductListing"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const OrderSuccess = lazy(() => import("./pages/order/OrderSuccess"));
const OrderList = lazy(() => import("./pages/order/OrderList"));
const NotFound = lazy(() => import("./_components/misc/NotFound"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/auth/me`, { withCredentials: true })
      .then(({ data }) => {
        console.log("data", data);
        if (data.success) {
          dispatch(userExists(data.user));
        }
      })
      .catch((err) => {
        dispatch(userNotExists());
        console.error(err.response?.data?.message || err.message);
      });
  }, [dispatch]);

  console.log("i am user", user);
  if (loader == true) {
    return <Loading />;
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderSuccess />} />
          </Route>
          <Route element={<ProtectRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
