import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import imgBanner from "/imgBanner.png";
import "../../styles/BolsaDeTrabajoPage.scss";
import { useResource } from "../recursos";
import { NavLink } from "react-router";

const BolsaDeTrabajoPage = () => {
  const estadoBolsaActualizado = useRef(false);
  const getBolsa = useResource((resource) => resource.getBolsa);
  const bolsa = useResource((resource) => resource.bolsa);

  useEffect(() => {
    if (!estadoBolsaActualizado.current) {
      getBolsa();
      estadoBolsaActualizado.current = true;
    }
  }, [getBolsa, bolsa]);

  return (
    <div>
      <Header />
      <div className="bolsaDeTrabajoPageBanner">
        <img src={imgBanner} alt="" />
      </div>
      {bolsa.length != 0
        ? bolsa.map((item, i) => (
            <div key={i} className="bolsaDeTrabajoPageItem">
              <h2>Nombre: {item.nombre}</h2>
              <p>Ubicación: {item.ubicacion}</p>
              <NavLink to={`/bolsa-de-trabajo/${item.id}`}>Ver más</NavLink>
            </div>
          ))
        : "No hay nada"}
    </div>
  );
};

export default BolsaDeTrabajoPage;
