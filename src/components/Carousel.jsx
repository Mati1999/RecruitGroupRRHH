import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "flowbite-react";
import { NavLink } from "react-router";
import "../../styles/carousel.scss";
import BannerHomeAhorraTiempo from "/bannersHome/BannerHomeAhorraTiempo.png";
import BannerHomeBolsaDeTrabajo from "/bannersHome/BannerHomeBolsaDeTrabajo.png";
import BannerHomeServicios from "/bannersHome/BannerHomeServicios.png";
import BannerHomeSomosRecruit from "/bannersHome/BannerHomeSomosRecruit.png";

import CarouselItems from "./CarouselItems";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import emergenciaLogo from "/emergencia.png";

const Carousel = () => {
  // const [curr, setCurr] = useState(0);

  // const prev = () => {
  //   setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  // };

  // const next = () => {
  //   setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  // };

  const slides = [
    { img: BannerHomeAhorraTiempo, to: "/candidatos" },
    { img: BannerHomeBolsaDeTrabajo, to: "/bolsa-de-trabajo" },
    { img: BannerHomeServicios, to: "/servicios" },
    { img: BannerHomeSomosRecruit, to: "/institucional" }
  ];

  return (
    <div className="App w-full md:h-[30rem] lg:h-[35rem] flex justify-center relative">
      <Swiper
        pagination={{
          clickable: true
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        className="mySwiper w-full h-full"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            {() => (
              <div
                className={`testimoniosDiv transition-all duration-500 ease-in-out transform w-full h-full flex justify-center items-center text-center rounded-xl`}
              >
                <div className="carouselItem">
                  <NavLink to={img.to}>
                    <img className="carousellItemsImg" key={i} src={img.img} alt="" />
                  </NavLink>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className=" top-1/2 left-[5rem] swiper-button-prev text-4xl font-bold transform z-50 cursor-pointer" />
      <div className="swiper-button-next top-1/2 left-[5rem] text-4xl font-bold transform z-50 cursor-pointer" />

      {/* <div className="overflow-hidden relative w-[90%] h-full flex justify-center">
        <div
          className="flex transition-transform ease-out duration-1000 w-full h-[90%]"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides.map((img, i) => (
            <div className="carouselItem">
              <NavLink to={img.to}>
                <img className="carousellItemsImg" key={i} src={img.img} alt="" />
              </NavLink>
            </div>
          ))}
        </div>
        <div className="absolute inset-1 flex items-center justify-between p-4 h-[90%]">
          <button
            onClick={prev}
            className="w-[2rem] h-[2rem] flex justify-center items-center rounded-full shadow bg-blue-400 text-white hover:bg-white hover:text-blue-400"
          >
            <ChevronLeftIcon className="text-xl" />
          </button>
          <button
            onClick={next}
            className="w-[2rem] h-[2rem] flex justify-center items-center rounded-full shadow bg-blue-400 text-white hover:bg-white hover:text-blue-400"
          >
            <ChevronRightIcon className="text-xl" />
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
      </div> */}
    </div>
  );
};

export default Carousel;
