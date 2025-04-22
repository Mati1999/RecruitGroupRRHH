import { ChevronLeftIcon, ChevronRightIcon } from "flowbite-react";
import React, { useState } from "react";

const CarouselItems = ({ children: slides }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="overflow-hidden relative w-full h-full">
      <div
        className="flex transition-transform ease-out duration-1000 w-full h-[90%]"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-1 flex items-center justify-between p-4">
        <button onClick={prev} className="rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
          <ChevronLeftIcon className="text-lg" />
        </button>
        <button onClick={next} className="rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
          <ChevronRightIcon className="text-lg" />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 rounded-full ${curr === i ? "p-2 bg-blue-600" : "bg-blue-300"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselItems;
