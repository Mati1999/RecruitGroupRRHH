import React, { useEffect, useRef, useState } from "react";
import { useResource } from "../recursos";
import { useParams } from "react-router";
import imgBanner from "/imgBanner.png";
import Header from "../components/Header";
import "../../styles/bolsaDeTrabajoItemPage.scss";

const BolsaDeTrabajoItemPage = () => {
  const estadoBolsaActualizado = useRef(false);
  const updateBolsa = useResource((resource) => resource.updateBolsa);
  const getBolsa = useResource((resource) => resource.getBolsa);
  const bolsa = useResource((resource) => resource.bolsa);
  const [bolsaActual, setBolsaActual] = useState([]);
  let { bolsaId } = useParams();

  useEffect(() => {
    if (!estadoBolsaActualizado.current) {
      setBolsaActual([bolsa.find((item) => item.id === bolsaId)]);
      estadoBolsaActualizado.current = true;
    }
  }, [getBolsa, updateBolsa, bolsa, bolsaId]);

  const submitForm = async (e) => {
    e.preventDefault();

    let candidato = {
      nombre: e.target.elements.nombre.value,
      apellido: e.target.elements.apellido.value,
      email: e.target.elements.email.value,
      telefono: e.target.elements.telefono.value,
      motivo: e.target.elements.motivo.value,
      curriculum: e.target.elements.curriculum.files[0]
    };
    await updateBolsa(bolsaActual, candidato, false);
  };

  return (
    <>
      <Header />
      <div className="bolsaDeTrabajoPageBanner">
        <img src={imgBanner} alt="" />
      </div>
      <main className="bolsaDeTrabajoItemMain">
        {bolsaActual
          ? bolsaActual.map((item, i) => (
              <div key={i}>
                <div className="bolsaDeTrabajoPageItem">
                  <h2>{item.nombre}</h2>
                  <p>Ubicación: {item.ubicacion}</p>
                  <p>Modalidad: {item.modalidad}</p>
                  <p>{item.info.descripcion}</p>
                  <p>Responsabilidades: {item.info.responsabilidades.join(", ")}</p>
                  <p>Requisitos: {item.info.requisitos.join(", ")}</p>
                </div>
                <h2>¡POSTULATE!</h2>

                <form onSubmit={submitForm}>
                  <div>
                    <input type="text" name="nombre" id="nombre" placeholder="Nombre:" />
                    <input type="text" name="apellido" id="apellido" placeholder="Apellido:" />
                  </div>
                  <input type="email" name="email" id="email" placeholder="Correo electrónico" />
                  <input type="text" name="telefono" id="telefono" placeholder="Teléfono:" />
                  <textarea name="motivo" id="motivo" placeholder="¿Por qué te gustaría postular?"></textarea>
                  <input type="file" name="curriculum" id="curriculum" />
                  <button type="submit">ENVIAR</button>
                </form>
              </div>
            ))
          : "No hay nada"}
      </main>
    </>
  );
};

export default BolsaDeTrabajoItemPage;
