import React from "react";
import { NavLink } from "react-router";
import "../../styles/carousel.scss";
import BannerHomeAhorraTiempo from "/bannersHome/BannerHomeAhorraTiempo.png";
import BannerHomeBolsaDeTrabajo from "/bannersHome/BannerHomeBolsaDeTrabajo.png";
import BannerHomeServicios from "/bannersHome/BannerHomeServicios.png";
import BannerHomeSomosRecruit from "/bannersHome/BannerHomeSomosRecruit.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Carousel = () => {
  const slides = [
    { img: BannerHomeAhorraTiempo, to: "/candidatos" },
    { img: BannerHomeBolsaDeTrabajo, to: "/bolsa-de-trabajo" },
    { img: BannerHomeServicios, to: "/servicios" },
    { img: BannerHomeSomosRecruit, to: "/institucional" }
  ];

  return (
    <div className="App w-full h-[15rem] sm:h-[16rem] md:h-[20rem] lg:h-[25rem] xl:h-[30rem] flex justify-center relative">
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
        className="mySwiper h-[10rem] sm:h-[15rem] md:w-full md:h-full"
      >
        {slides.map((img, i) => (
          <SwiperSlide key={i}>
            {() => (
              <div
                className={`transition-all duration-500 ease-in-out transform w-full h-full flex justify-center items-center text-center rounded-xl`}
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
      <div className="top-1/2 left-[5rem] swiper-button-prev text-4xl font-bold transform z-50 cursor-pointer" />
      <div className="swiper-button-next top-1/2 left-[5rem] text-4xl font-bold transform z-50 cursor-pointer" />
    </div>
  );
};

export default Carousel;
