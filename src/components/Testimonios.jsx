import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import emergenciaLogo from "/emergencia.png";
import "../../styles/testimonios.scss";

const testimonios = [
  {
    id: 1,
    empresa: "Empresa 1",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  },
  {
    id: 2,
    empresa: "Empresa 2",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  },
  {
    id: 3,
    empresa: "Empresa 3",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  },
  {
    id: 4,
    empresa: "Empresa 4",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  },
  {
    id: 5,
    empresa: "Empresa 5",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  },
  {
    id: 6,
    empresa: "Empresa 6",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  },
  {
    id: 7,
    empresa: "Empresa 7",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  },
  {
    id: 8,
    empresa: "Empresa 8",
    testimonio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum esse blanditiis dicta nesciunt, aut repellat, ipsam distinctio aperiam voluptatem ducimus quae quos rerum animi facere eum. Laborum, reprehenderit consequuntur!"
  }
];

const Testimonios = () => {
  return (
    <div className="testimonios relative w-full max-w-7xl mx-auto py-10">
      <h2 className="text-center mb-4 text-2xl font-bold">TESTIMONIOS</h2>

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
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        className="mySwiper w-full h-full"
      >
        {testimonios.map((testimonio) => (
          <SwiperSlide key={testimonio.id}>
            {({ isActive }) => (
              <div
                className={`testimoniosDiv transition-all duration-500 ease-in-out transform w-full h-full flex flex-col justify-center items-center text-center gap-5 ${
                  isActive ? "scale-100 opacity-100 z-20" : "scale-90 opacity-60 z-10"
                } bg-white rounded-xl shadow-md`}
              >
                <img src={emergenciaLogo} alt={testimonio.empresa} className="mx-auto mb-2 w-20" />
                <h3 className="font-bold text-lg">{testimonio.empresa}</h3>
                <p className="text-sm ">{testimonio.testimonio}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev text-4xl font-bold left-0 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer" />
      <div className="swiper-button-next text-4xl font-bold right-0 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer" />
    </div>
  );
};

export default Testimonios;
