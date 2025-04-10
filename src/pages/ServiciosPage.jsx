import React, { useEffect, useState } from "react";
import "../../styles/serviciosPage.scss";
import Header from "../components/Header";
import imgBanner from "/imgBanner.png";
import ServiciosCards from "../components/ServiciosCards";
import Footer from "../components/Footer";

const ServiciosPage = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetch("../src/servicios.json")
      .then((res) => res.json())
      .then((data) => setServicios(data));
  }, [servicios]);

  return (
    <>
      <Header />
      <div className="servicioPageBanner">
        <img src={imgBanner} alt="" />
      </div>

      <main className="servicioPageMain">
        {servicios.map((servicio, index) => (
          <ServiciosCards key={index} nombre={servicio.nombre} descripcion={servicio.descripcion} />
        ))}
      </main>

      <Footer />
    </>
  );
};

export default ServiciosPage;
