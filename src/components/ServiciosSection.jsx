import React from "react";
import "../styles/serviciossection.scss";
import { NavLink } from "react-router";
import { FaBrain } from "react-icons/fa";

const ServiciosSection = () => {
  return (
    <div className="servicioBanner">
      <h2>SERVICIOS</h2>
      <div className="servicioBanner--logos">
        <div>
          <ion-icon name="person"></ion-icon>
          <p>SELECCIÓN DE PERSONAL</p>
        </div>
        <div>
          <FaBrain />
          <p>PSICOTÉCNICO Y PSICODIAGNÓSTICO</p>
        </div>
        <div>
          <ion-icon name="briefcase"></ion-icon>
          <p>RECURSOS HUMANOS TERCERIZADO</p>
        </div>
        <div>
          <ion-icon name="receipt"></ion-icon>
          <p>DIAGNÓSTICO ORGANIZACIONAL</p>
        </div>
        <div>
          <ion-icon name="document-text"></ion-icon>
          <p>ARMADO DE CV</p>
        </div>
      </div>
      <NavLink to="/servicios">
        <button className="w-1/2 md:1/10 text-center">¡VER MÁS INFORMACIÓN!</button>
      </NavLink>
    </div>
  );
};

export default ServiciosSection;
