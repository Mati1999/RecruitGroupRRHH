import React, { useEffect, useRef, useState } from "react";
import "../styles/serviciospage.scss";
import Header from "../components/Header";
import ServiciosBanner from "/servicios/ServiciosBanner.png";
import ServiciosCards from "../components/ServiciosCards";
import Footer from "../components/Footer";

const ServiciosPage = () => {
  const servicioEstadoActual = useRef(false);
  const [servicios, setServicios] = useState([]);
  const [currentServicio, setCurrentServicio] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!servicioEstadoActual.current) {
      fetch("../servicios.json")
        .then((res) => res.json())
        .then((data) => setServicios(data));
      servicioEstadoActual.current = true;
    }
  }, [servicios]);

  return (
    <>
      <Header />
      <div className="servicioPageBanner">
        <img src={ServiciosBanner} alt="" />
      </div>

      <main className="servicioPageMain">
        {servicios.map((servicio, index) => (
          <ServiciosCards
            key={index}
            nombre={servicio.nombre}
            descripcion={servicio.descripcion}
            imgRoute={servicio.image}
            setCurrentServicio={() => setCurrentServicio(servicio)}
            setShowModal={() => setShowModal(true)}
          />
        ))}
      </main>

      {showModal && (
        <div className="servicioPageModalContainer">
          <div className="servicioPageModal">
            <h2>{currentServicio.nombre}</h2>
            <p>{currentServicio.descripcion}</p>
            <button
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => {
                setCurrentServicio({});
                setShowModal(false);
              }}
            >
              X
            </button>
          </div>
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
