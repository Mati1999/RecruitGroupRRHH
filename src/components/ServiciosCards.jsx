import React from "react";
import "../../styles/serviciosCards.scss";

const ServiciosCards = ({ nombre, descripcion, setCurrentServicio, setShowModal, imgRoute }) => {
  return (
    <div
      className="serviciosCard"
      onClick={() => {
        setCurrentServicio({ nombre, descripcion });
        setShowModal(true);
      }}
    >
      <h2>{nombre}</h2>
      <img src={imgRoute} alt="" loading="lazy" />
    </div>
  );
};

export default ServiciosCards;
