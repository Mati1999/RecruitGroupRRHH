import React from "react";
import emergenciaLogo from "/emergencia.png";
import "../../styles/infiniteCarousel.scss";

const InfiniteCarousel = () => {
  return (
    <div className="infiniteCarousel">
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
      <div>
        <div className="divBg"></div>
        <img src={emergenciaLogo} alt="" />
      </div>
    </div>
  );
};

export default InfiniteCarousel;
