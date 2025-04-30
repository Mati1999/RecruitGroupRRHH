import React, { useState } from "react";
import { NavLink } from "react-router";
import logoBlanco from "/logo/logoBlanco.png";
import LinkedInLogo from "/linkedInLogo.png";
import InstagramLogo from "/instagramLogo.png";
import "../../styles/header.scss";
import { useResource } from "../recursos";

const Header = () => {
  const logedIn = useResource((resource) => resource.logedIn);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <div className="headerContainer">
        <NavLink className="linkImg" to="/">
          <img src={logoBlanco} alt="" />
        </NavLink>
        {!logedIn ? (
          <>
            <ul className="headerContainer-ul">
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
              <a href="https://www.linkedin.com/company/recuit-group-consultora-rrhh/" target="_blank">
                <img src={LinkedInLogo} alt="" />
              </a>
              <a href="https://www.instagram.com/recruitgrouprrhh?igsh=MWsxa2lrbml0aXhiMg==" target="_blank">
                <img src={InstagramLogo} alt="" />
              </a>
            </div>
          </>
        ) : (
          <div className="logedInHeader">
            <NavLink to="/adminRRHHRecruitGroup">Volver al inicio</NavLink>
            <NavLink to="/">ir a la página</NavLink>
          </div>
        )}
      </div>

      <div className="headerMobile">
        <div className="headerMobile-logoMenu">
          <NavLink className="linkImgMobile" to="/">
            <img src={logoBlanco} alt="" />
          </NavLink>
          <ion-icon name="menu-outline" onClick={toggleMobileMenu}></ion-icon>
        </div>
        {showMobileMenu && (
          <div className="headerMobile-ulMenu">
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
            <div className="headerMobile-icons">
              <a href="">
                <img src={LinkedInLogo} alt="https://www.linkedin.com/company/recuit-group-consultora-rrhh/" />
              </a>
              <a href="">
                <img src={InstagramLogo} alt="https://www.instagram.com/recruitgrouprrhh?igsh=MWsxa2lrbml0aXhiMg== " />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
