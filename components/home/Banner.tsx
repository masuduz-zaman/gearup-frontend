"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const bannerSlides = [
  {
    id: 1,
    tag: "#1 Outdoor & Hiking Gear",
    title: "Explore Uncharted Trails With Confidence",
    highlight: "Hiking Gear.",
    description: "High-grade tents, backpacks, and camping essentials available for flexible daily rentals.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "Professional Photography",
    title: "Capture Every Detail On Your Big Day",
    highlight: "Camera & Lenses.",
    description: "Rent premium Sony, Canon, and RED camera bodies with ultra-sharp lenses for any shoot.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "Extreme Water Sports",
    title: "Ride The Waves Like A Professional Pro",
    highlight: "Water Sports.",
    description: "Top-tier kayaks, surfboards, and safety gear ready for your next weekend beach trip.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function AnimatedBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500 min-h-[520px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative min-h-[380px] md:min-h-[420px] flex items-center">
          
          {bannerSlides.map((slide, index) => {
            const isActive = index === current;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 ease-in-out ${
                  isActive
                    ? "opacity-100 pointer-events-auto scale-100"
                    : "opacity-0 pointer-events-none scale-100"
                }`}
              >
                <div
                  className={`space-y-5 transition-all duration-1000 ease-out transform ${
                    isActive ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                  }`}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300">
                    {slide.tag}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                    {slide.title.split(slide.highlight)[0]}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                      {slide.highlight}
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                    {slide.description}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Link
                      href="/gear"
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-0.5"
                    >
                      Browse Gear
                    </Link>
                    <Link
                      href="/about"
                      className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold transition"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>

                <div
                  className={`relative flex justify-center transition-all duration-1000 ease-out transform ${
                    isActive ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                  }`}
                >
                  <div className="relative w-full max-w-md h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            );
          })}

        </div>


      </div>
    </section>
  );
}