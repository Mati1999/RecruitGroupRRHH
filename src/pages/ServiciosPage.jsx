import React, { useEffect, useRef, useState } from "react";
import "../../styles/serviciosPage.scss";
import Header from "../components/Header";
import imgBanner from "/imgBanner.png";
import ServiciosCards from "../components/ServiciosCards";
import Footer from "../components/Footer";

const ServiciosPage = () => {
  const servicioEstadoActual = useRef(false);
  const [servicios, setServicios] = useState([]);
  const [currentServicio, setCurrentServicio] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!servicioEstadoActual.current) {
      fetch("../src/servicios.json")
        .then((res) => res.json())
        .then((data) => setServicios(data));
      servicioEstadoActual.current = true;
    }
  }, [servicios]);

  return (
    <>
      <Header />
      <div className="servicioPageBanner">
        <img src={imgBanner} alt="" />
      </div>

      <main className="servicioPageMain">
        {servicios.map((servicio, index) => (
          <ServiciosCards
            key={index}
            nombre={servicio.nombre}
            descripcion={servicio.descripcion}
            setCurrentServicio={() => setCurrentServicio(servicio)}
            setShowModal={() => setShowModal(true)}
          />
        ))}
      </main>

      {showModal && (
        <div className="servicioPageModal">
          <h2>{currentServicio.nombre}</h2>
          <p>{currentServicio.descripcion}</p>
          <button
            onClick={() => {
              setCurrentServicio({});
              setShowModal(false);
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      <div className="servicioPageContact">
        <h4>¿NECESITAS MÁS INFORMACIÓN?</h4>
        <button>CONTÁCTANOS</button>
      </div>
      <Footer />
    </>
  );
};

export default ServiciosPage;
