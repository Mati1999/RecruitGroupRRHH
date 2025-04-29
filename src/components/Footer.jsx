import React from "react";
import logoBlanco from "/logo/logoBlanco.png";
import LinkedInLogo from "/linkedInLogo.png";
import InstagramLogo from "/instagramLogo.png";
import "../../styles/footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <img src={logoBlanco} alt="" />
      <div className="footer--infoContainer">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, rerum nemo quod modi repellendus qui sint
          accusantium voluptates, fugit voluptatum vel sit fuga minus. Temporibus nostrum omnis sint doloribus harum?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, rerum nemo quod modi repellendus qui sint
          accusantium voluptates, fugit voluptatum vel sit fuga minus.
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
            <img src={LinkedInLogo} alt="" />
            <img src={InstagramLogo} alt="" />
          </div>
        </div>
      </div>
      <p className="byZeko">Página por: ZEKO</p>
    </div>
  );
};

export default Footer;
