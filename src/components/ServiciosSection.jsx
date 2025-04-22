import React from "react";
import "../../styles/serviciosSection.scss";
import servicioBanner1 from "/servicioBanner1.png";
import servicioBanner2 from "/servicioBanner2.png";
import servicioBanner3 from "/servicioBanner3.png";
import servicioBanner4 from "/servicioBanner4.png";
import servicioBanner5 from "/servicioBanner5.png";

const ServiciosSection = () => {
  return (
    <div className="servicioBanner">
      <h2>SERVICIOS</h2>
      <div className="servicioBanner--logos">
        <div>
          <img src={servicioBanner1} alt="" />
          <p>SELECCIÓN DE PERSONAL</p>
        </div>
        <div>
          <img src={servicioBanner2} alt="" />
          <p>PSICOTÉCNICO Y PSICODIAGNÓSTICO</p>
        </div>
        <div>
          <img src={servicioBanner3} alt="" />
          <p>RECURSOS HUMANOS TERCERIZADO</p>
        </div>
        <div>
          <img src={servicioBanner4} alt="" />
          <p>DIAGNÓSTICO ORGANIZACIONAL</p>
        </div>
        <div>
          <img src={servicioBanner5} alt="" />
          <p>ARMADO DE CV</p>
        </div>
      </div>
      <button className="w-1/10 text-center">¡VER MÁS SERVICIOS!</button>
    </div>
  );
};

export default ServiciosSection;
