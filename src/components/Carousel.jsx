import React from "react";
import "../../styles/carousel.scss";
import imgBanner2 from "/imgBanner2.png";
import CarouselItems from "./CarouselItems";

const Carousel = () => {
  const slides = [imgBanner2, imgBanner2, imgBanner2, imgBanner2];

  return (
    <div className="App w-full h-[25rem] flex justify-center">
      <CarouselItems>
        {slides.map((img, i) => (
          // <div key={i} className="bg-[url(/imgBanner.png)] w-[15rem]"></div>
          <img className="carousellItemsImg" key={i} src={img} alt="" />
        ))}
      </CarouselItems>
    </div>
  );
};

export default Carousel;
