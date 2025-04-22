import React from "react";
import "../../styles/serviciosCards.scss";
import servicioImg from "/servicioImg.png";

const ServiciosCards = ({ nombre, descripcion, setCurrentServicio, setShowModal }) => {
  return (
    <div
      className="serviciosCard"
      onClick={() => {
        setCurrentServicio({ nombre, descripcion });
        setShowModal(true);
      }}
    >
      <h2>{nombre}</h2>
      <img src={servicioImg} alt="" />
    </div>
  );
};

export default ServiciosCards;
