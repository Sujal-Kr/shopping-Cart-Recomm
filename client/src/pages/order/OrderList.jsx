import React from "react";
import { Link } from "react-router-dom";
import { Package, Calendar, DollarSign, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Applayout from "../../_components/layout/Applayout";
import { useUserOrders } from "../../hooks/api";
import Loading from "../../_components/misc/Loading";

const OrderList = () => {
  const { data, loading } = useUserOrders({ limit: 20 });
  const orders = data?.orders || [];

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Applayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-500">
            View and track your orders
            {data?.totalOrders > 0 && ` (${data.totalOrders} total)`}
          </p>
        </div>

        {orders.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-8">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <Link to="/products">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          // Orders List
          <div className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order._id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1 space-y-2">
                      {/* Order ID & Date */}
                      <div className="flex items-start gap-4 flex-wrap">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-mono text-sm font-medium text-gray-900">
                            {order._id}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {order.items.length} item
                          {order.items.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Status Badges */}
                      <div className="flex gap-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.orderStatus,
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.paymentStatus,
                          )}`}
                        >
                          Payment: {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Amount & Action */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                          <DollarSign className="w-5 h-5" />
                          <span>{order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>

                      <Link to={`/orders/${order._id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Items Thumbnails */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    {order.items.slice(0, 5).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                        title={item.name}
                      />
                    ))}
                    {order.items.length > 5 && (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600 font-medium">
                        +{order.items.length - 5}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Applayout>
  );
};

export default OrderList;
