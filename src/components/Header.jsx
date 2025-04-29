import React, { useState } from "react";
import { NavLink } from "react-router";
import logoBlanco from "/logo/logoBlanco.png";
import LinkedInLogo from "/linkedInLogo.png";
import InstagramLogo from "/instagramLogo.png";
import "../../styles/header.scss";
import { useResource } from "../recursos";

const Header = () => {
  const logedIn = useResource((resource) => resource.logedIn);
  return (
    <div className="headerContainer">
      <NavLink className="linkImg" to="/">
        <img src={logoBlanco} alt="" />
      </NavLink>
      {!logedIn ? (
        <>
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
        </>
      ) : (
        <div className="logedInHeader">
          <NavLink to="/adminRRHHRecruitGroup">Volver al inicio</NavLink>
          <NavLink to="/">ir a la página</NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
