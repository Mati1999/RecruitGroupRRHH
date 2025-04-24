import React, { useEffect, useRef, useState } from "react";
import { useResource } from "../recursos";
import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../styles/postulantes.scss";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Postulantes = () => {
  const estadoBolsaActualizado = useRef(false);
  const updateBolsa = useResource((resource) => resource.updateBolsa);
  const getBolsa = useResource((resource) => resource.getBolsa);
  const bolsa = useResource((resource) => resource.bolsa);
  const [bolsaActual, setBolsaActual] = useState({});
  let { bolsaPostulantesId } = useParams();

  const [currentBolsa, setCurrentBolsa] = useState({});
  const [candsInPanel, setCandsInPanel] = useState([]);

  useEffect(() => {
    if (!estadoBolsaActualizado.current) {
      setBolsaActual(bolsa.find((item) => item.id === bolsaPostulantesId));
      estadoBolsaActualizado.current = true;
    }
  }, [getBolsa, updateBolsa, bolsa, bolsaPostulantesId]);

  const filterCands = (text) => {
    const filteredCands = bolsaActual.candidatos.filter((candidato) => {
      return candidato.nombre.toLowerCase().includes(text.toLowerCase());
    });
    setCandsInPanel(filteredCands);
  };

  return (
    <>
      <Header />
      <div className="postulantesMain">
        <h2>BOLSA DE TRABAJO</h2>
        <input type="text" placeholder="Buscar nombre candidato" onChange={(e) => filterCands(e.target.value)} />
        <div className="postulantesMain_postulante">
          <div className="postulantesMain_postulante-cand">
            {candsInPanel.length > 0 ? (
              candsInPanel.map((cand) => (
                <div key={cand.email}>
                  <h4>{cand.nombre}</h4>
                  <button
                    onClick={() => {
                      setCurrentBolsa(cand);
                    }}
                  >
                    Ver
                  </button>
                </div>
              ))
            ) : bolsaActual.candidatos?.length > 0 ? (
              bolsaActual.candidatos.map((cand) => (
                <div key={cand.email}>
                  <h4>{cand.nombre}</h4>
                  <button
                    onClick={() => {
                      cand.fav = !cand.fav;
                      updateBolsa(bolsaActual, cand, "");
                      setBolsaActual({
                        ...bolsaActual,
                        candidatos: bolsaActual.candidatos.map((c) => (c.email === cand.email ? cand : c))
                      });
                    }}
                  >
                    {cand.fav ? <FaStar style={{ color: "rgb(241, 245, 0)" }} /> : <CiStar />}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentBolsa(cand);
                    }}
                  >
                    Ver
                  </button>
                </div>
              ))
            ) : (
              <h2>No hay candidatos</h2>
            )}
          </div>
          <div className="postulantesMain_postulante-info">
            {currentBolsa.nombre ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <h4>Nombre: {currentBolsa.nombre}</h4>
                <h4>Correo electrónico: {currentBolsa.email}</h4>
                <h4>Teléfono: {currentBolsa.telefono}</h4>
                <h4>Motivo: {currentBolsa.motivo}</h4>
                <div>
                  {currentBolsa.cv && (
                    <a href={currentBolsa.cv} target="blank">
                      Ver CV
                    </a>
                  )}
                  <button
                    onClick={() => {
                      updateBolsa(bolsaActual, false, currentBolsa);
                      setCurrentBolsa({});
                      setBolsaActual({
                        ...bolsaActual,
                        candidatos: bolsaActual.candidatos.filter((cand) => cand.email !== currentBolsa.email)
                      });
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </form>
            ) : (
              <h4>Seleccione un candidato</h4>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Postulantes;
