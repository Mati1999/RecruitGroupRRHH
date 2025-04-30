import React, { useEffect, useRef, useState } from "react";
import { useResource } from "../recursos";
import "../../styles/candidatosPanel.scss";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const CandidatosPanel = () => {
  const getCandidatos = useResource((resource) => resource.getCandidatos);
  const setCantidatos = useResource((resource) => resource.setCantidatos);
  const deteleCandidato = useResource((resource) => resource.deteleCandidato);
  const updateCandidatos = useResource((resource) => resource.updateCandidatos);
  const candidatos = useResource((resource) => resource.candidatos);
  const logedIn = useResource((resource) => resource.logedIn);
  const estadoCandidatosActualizado = useRef(false);

  if (!logedIn) {
    Navigate("/adminRRHHRecruitGroup");
  }

  const [currentCand, setCurrentCand] = useState({});
  const [candsInPanel, setCandsInPanel] = useState([]);
  const [editCand, setEditCand] = useState(false);
  const [currentEditedCand, setCurrentEditedCand] = useState({});

  // Estados para los valores de los inputs de edición
  const [nombreCand, setNombreCand] = useState("");
  const [edadCand, setEdadCand] = useState("");
  const [profesionCand, setProfesionCand] = useState("");
  const [anosExpCand, setAnosExpCand] = useState("");
  const [cvCand, setcvCand] = useState("");
  const [psicoCand, setPsicoCand] = useState("");
  const [fotoCand, setFotoCand] = useState("");

  useEffect(() => {
    setNombreCand(currentEditedCand.nombre || "");
    setEdadCand(currentEditedCand.edad || "");
    setProfesionCand(currentEditedCand.profesion || "");
    setAnosExpCand(currentEditedCand.anosExp || "");
    setcvCand(currentEditedCand.cv || "");
    setPsicoCand(currentEditedCand.aptoPsico || "");
    setFotoCand(currentEditedCand.foto || "");
  }, [currentEditedCand]);

  useEffect(() => {
    if (!estadoCandidatosActualizado.current) {
      getCandidatos();

      estadoCandidatosActualizado.current = true;
    }
  }, [getCandidatos, setCantidatos, deteleCandidato, updateCandidatos, candidatos]);

  useEffect(() => {}, [currentCand, candidatos, getCandidatos]);

  const filterCands = (text) => {
    const filteredCands = candidatos.filter((candidato) => {
      return candidato.nombre.toLowerCase().includes(text.toLowerCase());
    });
    setCandsInPanel(filteredCands);
  };

  const handleUpdateCand = () => {
    const updatedCand = {
      ...currentCand,
      nombre: nombreCand,
      edad: edadCand,
      profesion: profesionCand,
      anosExp: anosExpCand,
      cv: cvCand,
      aptoPsico: psicoCand,
      foto: fotoCand
    };
    updateCandidatos(updatedCand);
    setCurrentCand({});
    setEditCand(false);

    toast.success("Has actualizado un candidato", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  const handleCreateCand = () => {
    const updatedCand = {
      ...currentCand,
      nombre: nombreCand,
      edad: edadCand,
      profesion: profesionCand,
      anosExp: anosExpCand,
      cv: cvCand,
      aptoPsico: psicoCand,
      foto: fotoCand
    };
    setCantidatos(updatedCand);
    setCurrentCand({});
    setEditCand(false);

    toast.success("Has agregado un nuevo candidato", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        style={{ top: "6rem" }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="candidatosPanel">
        <h2>CANDIDATOS</h2>
        <input
          className="candidatosPanel-searchInput"
          type="text"
          placeholder="Buscar nombre candidato"
          onChange={(e) => filterCands(e.target.value)}
        />
        <div className="candidatosPanel_candidatos">
          <div className="candidatosPanel_candidatos-cand">
            <button
              onClick={() => {
                setEditCand(true);
                setNombreCand("");
                setEdadCand("");
                setProfesionCand("");
                setAnosExpCand("");
                setcvCand("");
                setPsicoCand("");
                setFotoCand("");
                setCurrentCand({ id: "" });
              }}
            >
              + Agregar nuevo candidato
            </button>
            <div className="candidatosPanel_candidatos-candPanel">
              {candsInPanel.length > 0
                ? candsInPanel.map((candidato) => (
                    <div key={candidato.id}>
                      <h4>{candidato.nombre}</h4>
                      <button
                        onClick={() => {
                          setCurrentCand(candidato);
                        }}
                      >
                        Ver
                      </button>
                    </div>
                  ))
                : candidatos.map((candidato) => (
                    <div key={candidato.id}>
                      <h4>{candidato.nombre}</h4>
                      <button
                        onClick={() => {
                          setCurrentCand(candidato);
                        }}
                      >
                        Ver
                      </button>
                    </div>
                  ))}
            </div>
          </div>
          <div className="candidatosPanel_candidatos-info">
            {currentCand.nombre || editCand ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <h4>
                  <b>Nombre y Apellido:</b>{" "}
                  {editCand ? (
                    <input type="text" value={nombreCand} onChange={(e) => setNombreCand(e.target.value)} />
                  ) : (
                    currentCand.nombre
                  )}
                </h4>
                <h4>
                  <b>Edad:</b>{" "}
                  {editCand ? (
                    <input type="number" value={edadCand} onChange={(e) => setEdadCand(e.target.value)} />
                  ) : (
                    currentCand.edad
                  )}
                </h4>
                <h4>
                  <b>Trabajo:</b>{" "}
                  {editCand ? (
                    <input type="text" value={profesionCand} onChange={(e) => setProfesionCand(e.target.value)} />
                  ) : (
                    currentCand.profesion
                  )}
                </h4>
                <h4>
                  <b>Años de experiencia:</b>{" "}
                  {editCand ? (
                    <input type="number" value={anosExpCand} onChange={(e) => setAnosExpCand(e.target.value)} />
                  ) : (
                    currentCand.anosExp
                  )}
                </h4>
                <div>
                  {editCand ? (
                    <>
                      <button onClick={() => setEditCand(false)}>Cancelar</button>
                      <button
                        onClick={() => {
                          currentCand.id ? handleUpdateCand() : handleCreateCand();
                        }}
                      >
                        Aceptar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditCand(true);
                        setCurrentEditedCand(currentCand);
                        setNombreCand(currentCand.nombre || "");
                        setEdadCand(currentCand.edad || "");
                        setProfesionCand(currentCand.profesion || "");
                        setAnosExpCand(currentCand.anosExp || "");
                        setcvCand(currentCand.cv || "");
                        setPsicoCand(currentCand.aptoPsico || "");
                        setFotoCand(currentCand.aptoPsico || "");
                      }}
                    >
                      Editar
                    </button>
                  )}
                  {!editCand && (
                    <button
                      onClick={() => {
                        Swal.fire({
                          title:
                            "Seguro que quieres eliminar al/la candidato/a?. Se liminará toda su información de la base de datos.",
                          showCancelButton: true,
                          confirmButtonText: "Eliminar"
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deteleCandidato(currentCand);
                            setCurrentCand({});
                            setEditCand(false);
                            toast.success("Has eliminado un candidato", {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored"
                            });
                          }
                        });
                      }}
                    >
                      Eliminar
                    </button>
                  )}

                  {editCand ? (
                    <div className="subirArchivoDiv">
                      <label htmlFor="">Subir CV</label>
                      <input
                        type="file"
                        name="curriculum"
                        id="curriculum"
                        accept=".pdf"
                        onChange={(e) => setcvCand(e.target.files[0])}
                      />
                    </div>
                  ) : (
                    currentCand.cv && (
                      <a href={currentCand.cv} target="blank">
                        Ver CV
                      </a>
                    )
                  )}
                  {editCand ? (
                    <div className="subirArchivoDiv">
                      <label htmlFor="">Subir Psicotécnico</label>
                      <input
                        type="file"
                        name="psicotecnico"
                        id="psicotecnico"
                        accept=".pdf"
                        onChange={(e) => setPsicoCand(e.target.files[0])}
                      />
                    </div>
                  ) : (
                    currentCand.aptoPsico && (
                      <a href={currentCand.aptoPsico} target="blank">
                        Ver Psicotécnico
                      </a>
                    )
                  )}
                  {editCand ? (
                    <div className="subirArchivoDiv">
                      <label htmlFor="">Subir Foto</label>
                      <input
                        type="file"
                        name="foto"
                        id="foto"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => setFotoCand(e.target.files[0])}
                      />
                    </div>
                  ) : (
                    currentCand.foto && (
                      <a href={currentCand.foto} target="blank">
                        Ver Foto
                      </a>
                    )
                  )}
                </div>
              </form>
            ) : (
              <h4>Selecciona un candidato</h4>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CandidatosPanel;
