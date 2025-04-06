import React from "react";
import emergenciaLogo from "/emergencia.png";
import "../../styles/testimonios.scss";

const Testimonios = () => {
  return (
    <div className="testimonios">
      <h2>TESTIMONIOS</h2>
      <div className="testimonios--empresas">
        <div>
          <img src={emergenciaLogo} alt="" />
          <h3>EMPRESA</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ab atque commodi perferendis eum aliquam
            corporis quidem, ipsum, maiores similique voluptatem maxime voluptas esse non. Quo ipsum deserunt aperiam
            dignissimos.
          </p>
        </div>
        <div>
          <img src={emergenciaLogo} alt="" />
          <h3>EMPRESA</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ab atque commodi perferendis eum aliquam
            corporis quidem, ipsum, maiores similique voluptatem maxime voluptas esse non. Quo ipsum deserunt aperiam
            dignissimos.
          </p>
        </div>
        <div>
          <img src={emergenciaLogo} alt="" />
          <h3>EMPRESA</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ab atque commodi perferendis eum aliquam
            corporis quidem, ipsum, maiores similique voluptatem maxime voluptas esse non. Quo ipsum deserunt aperiam
            dignissimos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonios;
