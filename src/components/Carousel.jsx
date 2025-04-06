import React from "react";
import "../../styles/carousel.scss";
import imgBanner from "/imgBanner.png";
import CarouselItems from "./CarouselItems";

const Carousel = () => {
  const slides = [imgBanner, imgBanner, imgBanner, imgBanner];

  return (
    <div className="App w-full h-[20rem] flex justify-center">
      <CarouselItems>
        {slides.map((img, i) => (
          // <div key={i} className="bg-[url(/imgBanner.png)] w-[15rem]"></div>
          <img className="aspect-[16/3] " key={i} src={img} alt="" />
        ))}
      </CarouselItems>
    </div>
  );
};

export default Carousel;
