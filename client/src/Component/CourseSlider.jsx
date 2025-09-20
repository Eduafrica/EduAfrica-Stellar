import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./Helpers/CourseCard";


function CourseSlider({ data, setSelectedCourse }) {
  const courseData = data || [];

  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll availability with better tolerance
  const checkForScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setCanScrollLeft(scrollLeft > 1);
    // Increased tolerance to 10px for better detection
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    // Small delay to ensure proper rendering
    const timer = setTimeout(() => {
      checkForScroll();
    }, 100);

    const handleResize = () => {
      setTimeout(checkForScroll, 100);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [courseData]);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg border transition-all duration-200"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
      )}

      {/* Slider Container with proper padding */}
      <div
        ref={containerRef}
        onScroll={checkForScroll}
        className="w-full overflow-x-auto scrollbar-hide"
        style={{
          // Ensure smooth scrolling and hide scrollbar
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {/* Inner container with proper spacing */}
        <div className="flex gap-6 px-6 py-2">
          {courseData?.map((item, idx) => (
            <div key={idx} className="flex-shrink-0">
              <CourseCard data={item} setSelectedCourse={setSelectedCourse} />
            </div>
          ))}
          {/* Add extra spacing at the end to prevent cutoff */}
          <div className="w-6 flex-shrink-0" />
        </div>
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 p-2 rounded-full shadow-lg border transition-all duration-200"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      )}

      {/* Custom scrollbar hiding styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default CourseSlider;