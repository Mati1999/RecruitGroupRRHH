import React from "react";
import "../../styles/serviciosCards.scss";
import servicioImg from "/servicioImg.png";

const ServiciosCards = ({ nombre, descripcion }) => {
  return (
    <div className="serviciosCard">
      <h2>{nombre}</h2>
      <img src={servicioImg} alt="" />
    </div>
  );
};

export default ServiciosCards;
