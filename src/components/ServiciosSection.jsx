import React from "react";
import "../../styles/serviciosSection.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBrain } from "react-icons/fa";
// import servicioBanner1 from "/servicioBanner1.png";
// import servicioBanner2 from "/servicioBanner2.png";
// import servicioBanner3 from "/servicioBanner3.png";
// import servicioBanner4 from "/servicioBanner4.png";
// import servicioBanner5 from "/servicioBanner5.png";

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
      <button className="w-1/10 text-center">¡VER MÁS SERVICIOS!</button>
    </div>
  );
};

export default ServiciosSection;
