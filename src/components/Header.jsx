import React from "react";
import { NavLink } from "react-router";
import Logo from "/Logo.png";
import LinkedInLogo from "/linkedInLogo.png";
import InstagramLogo from "/instagramLogo.png";
import "../../styles/header.scss";

const Header = () => {
  return (
    <div className="headerContainer">
      <NavLink className="linkImg" to="/">
        <img src={Logo} alt="" />
      </NavLink>
      <ul>
        <NavLink to="/">
          <li className="">Inicio</li>
        </NavLink>
        <NavLink to="/servicios">
          <li>Servicios</li>
        </NavLink>
        <NavLink to="/bolsa-de-trabajo">
          <li>Bolsa de trabajo</li>
        </NavLink>
        <NavLink to="/candidatos">
          <li>Candidatos</li>
        </NavLink>
        <NavLink to="/institucional">
          <li>Institucional</li>
        </NavLink>
        <NavLink to="/contacto">
          <li>Contacto</li>
        </NavLink>
      </ul>
      <div className="iconsDiv">
        <img src={LinkedInLogo} alt="" />
        <img src={InstagramLogo} alt="" />
      </div>
    </div>
  );
};

export default Header;
