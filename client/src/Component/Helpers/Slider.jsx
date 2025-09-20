import { useState, useEffect } from "react";

function Slider({ imageArray }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-loop effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === imageArray.length - 1 ? 0 : prev + 1
      );
    }, 3000); // change every 3s

    return () => clearInterval(interval);
  }, [imageArray]);

  return (
    <div className="w-full h-full relative">
      {imageArray.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default Slider;
