import React from "react";
import logoBlanco from "/logo/logoBlanco.png";
import LinkedInLogo from "/linkedInLogo.png";
import InstagramLogo from "/instagramLogo.png";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <img src={logoBlanco} alt="" />
      <div className="footer--infoContainer">
        <p>
          Desde Recruit Group, nos dedicamos con entusiasmo, pasión y compromiso a ofrecer soluciones integrales de
          Recursos Humanos. Acompañamos a tu empresa en la selección, evaluación y desarrollo de talento, proporcionando
          un servicio cercano y totalmente personalizado. Nuestro objetivo es impulsar tu crecimiento organizacional y
          fortalecer tu equipo con el mejor capital humano.
        </p>
        <div className="footer--contact">
          <h4>CONTACTO</h4>
          <p>Mendoza, Argentina</p>
          <p>rrhh@recruitgroupar.com</p>
          <h4 style={{ marginTop: "1rem" }}>¡ENVIANOS TU CV!</h4>
          <p>seleccion@recruitgroupar.com</p>
        </div>
        <div className="footer--social">
          <h4>REDES SOCIALES</h4>
          <div className="iconsDiv">
            <a href="https://www.linkedin.com/company/recuit-group-consultora-rrhh/" target="_blank">
              <img src={LinkedInLogo} alt="" />
            </a>
            <a href="https://www.instagram.com/recruitgrouprrhh?igsh=MWsxa2lrbml0aXhiMg==" target="_blank">
              <img src={InstagramLogo} alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer--infoContainerMobile">
        <h3>Mendoza, Argentina</h3>
        <div className="footer--infoContainerMobile_content">
          <p>
            Desde Recruit Group, nos dedicamos con entusiasmo, pasión y compromiso a ofrecer soluciones integrales de
            Recursos Humanos. Acompañamos a tu empresa en la selección, evaluación y desarrollo de talento,
            proporcionando un servicio cercano y totalmente personalizado. Nuestro objetivo es impulsar tu crecimiento
            organizacional y fortalecer tu equipo con el mejor capital humano.
          </p>
          <div className="footer--contact">
            <div>
              <h4>CONTACTO</h4>
              <p>rrhh@recruitgroupar.com</p>
            </div>
            <div>
              <h4 style={{ marginTop: "1rem" }}>¡ENVIANOS TU CV!</h4>
              <p>seleccion@recruitgroupar.com</p>
            </div>
            <div className="footer--social">
              <h4>REDES SOCIALES</h4>
              <div className="iconsDiv">
                <a href="https://www.linkedin.com/company/recuit-group-consultora-rrhh/" target="_blank">
                  <img src={LinkedInLogo} alt="" />
                </a>
                <a href="https://www.instagram.com/recruitgrouprrhh?igsh=MWsxa2lrbml0aXhiMg==" target="_blank">
                  <img src={InstagramLogo} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="byZeko">Página por: ZEKO</p>
    </div>
  );
};

export default Footer;
