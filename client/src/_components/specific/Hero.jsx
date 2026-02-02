import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const heroSlides = [
  
  {
    title: "Electronics Sale",
    subtitle: "Best deals on gadgets",
    description:
      "Get the latest smartphones, laptops & accessories at unbeatable prices.",
    buttonText: "Explore Deals",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80",
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    title: "Home & Living",
    subtitle: "Transform your space",
    description:
      "Beautiful furniture and decor to make your house feel like home.",
    buttonText: "View Collection",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Summer Collection 2026",
    subtitle: "Discover the latest trends",
    description:
      "Explore our new arrivals with up to 50% off on selected items. Limited time offer!",
    buttonText: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    gradient: "from-violet-600 to-indigo-600",
  },
  {
    title: "Sports & Fitness",
    subtitle: "Gear up for greatness",
    description: "Premium equipment for athletes and fitness enthusiasts.",
    buttonText: "Get Started",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const Hero = () => {
  return (
    <div className="w-full overflow-hidden ">
      <Carousel className="w-full ">
        <CarouselContent className="p-3">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 overflow-hidden rounded-none md:rounded-xl">
                <CardContent className="p-3">
                  <div className="grid md:grid-cols-2 min-h-[250px]">
                    {/* Text Content */}
                    <div
                      className={`flex flex-col justify-center p-8 md:p-12 bg-linear-to-br ${slide.gradient} text-white`}
                    >
                      <span className="text-sm font-medium uppercase tracking-wider opacity-80 mb-2">
                        {slide.subtitle}
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-base md:text-lg opacity-90 mb-6 max-w-md">
                        {slide.description}
                      </p>
                      <div>
                        <Button
                          size="lg"
                          className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          {slide.buttonText}
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover min-h-[250px] md:min-h-[350px] transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-l from-transparent to-black/10" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 h-10 w-10 hover:bg-white" />
        <CarouselNext className="right-4 h-10 w-10 hover:bg-white" />
      </Carousel>

    </div>
  );
};

export default Hero;
