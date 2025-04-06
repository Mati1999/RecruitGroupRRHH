import React from "react";
import Logo from "/Logo.png";
import LinkedInLogo from "/linkedInLogo.png";
import InstagramLogo from "/instagramLogo.png";
import "../../styles/header.scss";

const Header = () => {
  return (
    <div className="headerContainer">
      <img src={Logo} alt="" />
      <ul>
        <li className="">Inicio</li>
        <li>Servicios</li>
        <li>Bolsa de trabajo</li>
        <li>Candidatos</li>
        <li>Institucional</li>
        <li>Contacto</li>
      </ul>
      <div className="iconsDiv">
        <img src={LinkedInLogo} alt="" />
        <img src={InstagramLogo} alt="" />
      </div>
    </div>
  );
};

export default Header;
