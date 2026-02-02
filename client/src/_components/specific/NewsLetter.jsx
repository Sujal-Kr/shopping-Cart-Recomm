import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineMail, AiOutlineCheck } from "react-icons/ai";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Handle newsletter subscription logic here
      console.log("Subscribing:", email);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="w-full bg-gray-100 my-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 items-center">
          {/* Content */}
          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-violet-100 rounded-full">
                <AiOutlineMail className="text-xl text-violet-600" />
              </div>
              <span className="text-sm font-medium text-violet-600 uppercase tracking-wider">
                Newsletter
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay in the loop
            </h2>

            <p className="text-gray-600 mb-6 max-w-md">
              Subscribe to our newsletter and be the first to know about new
              arrivals, exclusive deals, and special offers.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 py-6 bg-white border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 font-medium transition-all duration-300 hover:shadow-lg"
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-2">
                    <AiOutlineCheck /> Subscribed!
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>

          {/* Image */}
          <div className="hidden md:block h-full">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="Happy shopper"
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
