import React, { useEffect, useRef, useState } from "react";
import { useResource } from "../recursos";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/bolsaDeTrabajoPanel.scss";
import { NavLink, useNavigate } from "react-router";

const BolsaDeTrabajoPanel = () => {
  let navigate = useNavigate();
  const getBolsa = useResource((resource) => resource.getBolsa);
  const setBolsa = useResource((resource) => resource.setBolsa);
  const deteleBolsa = useResource((resource) => resource.deteleBolsa);
  const updateBolsa = useResource((resource) => resource.updateBolsa);
  const logedIn = useResource((resource) => resource.logedIn);
  const bolsa = useResource((resource) => resource.bolsa);
  const estadoBolsaActualizado = useRef(false);
  if (!logedIn) {
    navigate("/adminRRHHRecruitGroup");
  }

  // modal functionality
  const [openModal, setOpenModal] = useState(false);
  const [modalFormResponsabilidades, setModalFormResponsabilidades] = useState([]);
  const [modalFormRequisitos, setModalFormRequisitos] = useState([]);
  const [currentFormData, setCurrentFormData] = useState("");

  const handleAgregarResponsabilidad = () => {
    if (currentFormData === "responsabilidades") {
      if (modalFormResponsabilidades[modalFormResponsabilidades.length - 1] !== "") {
        setModalFormResponsabilidades([...modalFormResponsabilidades, ""]); // Añade un string vacío para un nuevo input
      }
    } else {
      if (modalFormRequisitos[modalFormRequisitos.length - 1] !== "") {
        setModalFormRequisitos([...modalFormRequisitos, ""]); // Añade un string vacío para un nuevo input
      }
    }
  };

  const handleInputChange = (index, event) => {
    if (currentFormData === "responsabilidades") {
      const nuevasResponsabilidades = [...modalFormResponsabilidades];
      nuevasResponsabilidades[index] = event.target.value;
      setModalFormResponsabilidades(nuevasResponsabilidades);
    } else {
      const nuevosRequisitos = [...modalFormRequisitos];
      nuevosRequisitos[index] = event.target.value;
      setModalFormRequisitos(nuevosRequisitos);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentFormData === "responsabilidades") {
      setCurrentBolsa({
        ...currentBolsa,
        info: {
          ...currentBolsa.info,
          responsabilidades:
            modalFormResponsabilidades[modalFormResponsabilidades.length - 1] === ""
              ? modalFormResponsabilidades.pop()
              : modalFormResponsabilidades
        }
      });
      setResponsabilidadesBolsa(modalFormResponsabilidades);
      console.log("Responsabilidades ingresadas:", modalFormResponsabilidades);
    } else {
      setCurrentBolsa({
        ...currentBolsa,
        info: {
          ...currentBolsa.info,
          requisitos:
            modalFormRequisitos[modalFormRequisitos.length - 1] === "" ? modalFormRequisitos.pop() : modalFormRequisitos
        }
      });
      setRequisitosBolsa(modalFormRequisitos);
      console.log("Responsabilidades ingresadas:", modalFormRequisitos);
    }
  };

  // Estados para los valores de los inputs de búsqueda y edición
  const [currentBolsa, setCurrentBolsa] = useState({});
  const [candsInPanel, setCandsInPanel] = useState([]);
  const [editBolsa, setEditBolsa] = useState(false);
  const [currentEditedBolsa, setCurrentEditedBolsa] = useState({});

  // Estados para los valores de los inputs de edición
  const [nombreBolsa, setNombreBolsa] = useState("");
  const [ubicacionBolsa, setUbicacionBolsa] = useState("");
  const [modalidadBolsa, setModalidadBolsa] = useState("");
  const [disponibilidadBolsa, setDisponibilidadBolsa] = useState("");
  const [descripcionBolsa, setDescripcionBolsa] = useState("");
  const [responsabilidadesBolsa, setResponsabilidadesBolsa] = useState([]);
  const [requisitosBolsa, setRequisitosBolsa] = useState([]);
  const [candidatosBolsa, setCandidatosBolsa] = useState([]);
  const [closedBolsa, setClosedBolsa] = useState("closed");

  useEffect(() => {
    setNombreBolsa(currentEditedBolsa.nombre || "");
    setUbicacionBolsa(currentEditedBolsa.ubicacion || "");
    setModalidadBolsa(currentEditedBolsa.modalidad || "");
    setDisponibilidadBolsa(currentEditedBolsa.disponibilidad || "");
    setDescripcionBolsa(currentEditedBolsa.info?.descripcion || "");
    setResponsabilidadesBolsa(currentEditedBolsa.info?.responsabilidades || []);
    setRequisitosBolsa(currentEditedBolsa.info?.requisitos || []);
    setCandidatosBolsa(currentEditedBolsa.info?.candidatos || []);
    setClosedBolsa(currentEditedBolsa.closed);
  }, [currentEditedBolsa]);

  useEffect(() => {
    if (!estadoBolsaActualizado.current) {
      getBolsa();

      estadoBolsaActualizado.current = true;
      console.log(bolsa);
    }
  }, [getBolsa, setBolsa, deteleBolsa, updateBolsa, bolsa]);

  useEffect(() => {
    console.log(currentBolsa);
  }, [currentBolsa, bolsa, getBolsa]);

  const filterCands = (text) => {
    const filteredCands = bolsa.filter((candidato) => {
      return candidato.nombre.toLowerCase().includes(text.toLowerCase());
    });
    setCandsInPanel(filteredCands);
  };

  const handleCloseBolsa = () => {
    const updatedBolsa = {
      ...currentBolsa,
      closed: closedBolsa === "closed" ? "open" : "closed"
    };
    setClosedBolsa(closedBolsa === "closed" ? "open" : "closed");
    console.log("Cerrando bolsa", currentBolsa);
    updateBolsa(updatedBolsa, "", "");
    setCurrentBolsa({});
    setEditBolsa(false);
  };

  const handleUpdateBolsa = () => {
    const updatedBolsa = {
      ...currentBolsa,
      nombre: nombreBolsa,
      ubicacion: ubicacionBolsa,
      modalidad: modalidadBolsa,
      disponibilidad: disponibilidadBolsa,
      info: { descripcion: descripcionBolsa, responsabilidades: responsabilidadesBolsa, requisitos: requisitosBolsa },
      candidatos: [...candidatosBolsa],
      closed: closedBolsa
    };
    console.log(updatedBolsa);
    updateBolsa(updatedBolsa, "", "");
    setCurrentBolsa({});
    setEditBolsa(false);
  };

  const handleCreateBolsa = () => {
    const updatedBolsa = {
      ...currentBolsa,
      nombre: nombreBolsa,
      ubicacion: ubicacionBolsa,
      modalidad: modalidadBolsa,
      disponibilidad: disponibilidadBolsa,
      info: { descripcion: descripcionBolsa, responsabilidades: responsabilidadesBolsa, requisitos: requisitosBolsa },
      candidatos: [...candidatosBolsa],
      closed: false
    };
    console.log(updatedBolsa);
    setBolsa(updatedBolsa);
    setCurrentBolsa({});
    setEditBolsa(false);
  };

  return (
    <>
      <Header />
      <div className="bolsaDeTrabajoPanel">
        <h2>BOLSA DE TRABAJO</h2>
        <input type="text" placeholder="Buscar nombre candidato" onChange={(e) => filterCands(e.target.value)} />
        <div className="bolsaDeTrabajoPanel_bolsaDeTrabajo">
          <div className="bolsaDeTrabajoPanel_bolsaDeTrabajo-cand">
            <button
              onClick={() => {
                setEditBolsa(true);
                setNombreBolsa("");
                setUbicacionBolsa("");
                setModalidadBolsa("");
                setDisponibilidadBolsa("");
                setDescripcionBolsa("");
                setResponsabilidadesBolsa([]);
                setRequisitosBolsa([]);
                setCandidatosBolsa([]);
                setClosedBolsa("closed");
                setCurrentBolsa({ id: "" });
              }}
            >
              + Agregar nuevo puesto
            </button>
            {candsInPanel.length > 0
              ? candsInPanel.map((bolsa) => (
                  <div key={bolsa.nombre}>
                    <h4>{bolsa.nombre}</h4>
                    <button
                      onClick={() => {
                        setCurrentBolsa(bolsa);
                        setEditBolsa(false);
                        setOpenModal(false);
                      }}
                    >
                      Ver
                    </button>
                  </div>
                ))
              : bolsa.map((bolsa) => (
                  <div key={bolsa.nombre}>
                    <h4>{bolsa.nombre}</h4>
                    <button
                      onClick={() => {
                        setCurrentBolsa(bolsa);
                        setEditBolsa(false);
                        setOpenModal(false);
                      }}
                    >
                      Ver
                    </button>
                  </div>
                ))}
          </div>
          <div className="bolsaDeTrabajoPanel_bolsaDeTrabajo-info">
            {currentBolsa.nombre || editBolsa ? (
              <form onSubmit={(e) => e.preventDefault()}>
                <h4>
                  Nombre del puesto:{" "}
                  {editBolsa ? (
                    <input type="text" value={nombreBolsa} onChange={(e) => setNombreBolsa(e.target.value)} />
                  ) : (
                    currentBolsa.nombre
                  )}
                </h4>
                <h4>
                  Ubicación:{" "}
                  {editBolsa ? (
                    <input type="text" value={ubicacionBolsa} onChange={(e) => setUbicacionBolsa(e.target.value)} />
                  ) : (
                    currentBolsa.ubicacion
                  )}
                </h4>
                <h4>
                  Modalidad:{" "}
                  {editBolsa ? (
                    <input type="text" value={modalidadBolsa} onChange={(e) => setModalidadBolsa(e.target.value)} />
                  ) : (
                    currentBolsa.modalidad
                  )}
                </h4>
                <h4>
                  Disponibilidad:{" "}
                  {editBolsa ? (
                    <input
                      type="text"
                      value={disponibilidadBolsa}
                      onChange={(e) => setDisponibilidadBolsa(e.target.value)}
                    />
                  ) : (
                    currentBolsa.disponibilidad
                  )}
                </h4>
                <h4>
                  Breve descripción:{" "}
                  {editBolsa ? (
                    <input type="text" value={descripcionBolsa} onChange={(e) => setDescripcionBolsa(e.target.value)} />
                  ) : (
                    currentBolsa.info.descripcion
                  )}
                </h4>
                <h4>
                  Responsabilidades:{" "}
                  {editBolsa ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(true);
                        setModalFormResponsabilidades(responsabilidadesBolsa);
                        setCurrentFormData("responsabilidades");
                      }}
                    >
                      Agregar Responsabilidades
                    </button>
                  ) : (
                    currentBolsa.info?.responsabilidades.join(", ") || ""
                  )}
                </h4>
                <h4>
                  Requisitos:{" "}
                  {editBolsa ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(true);
                        setModalFormRequisitos(requisitosBolsa);
                        setCurrentFormData("requisitos");
                      }}
                    >
                      Agregar Requisitos
                    </button>
                  ) : (
                    currentBolsa.info?.requisitos.join(", ") || ""
                  )}
                </h4>
                <div>
                  <button
                    onClick={() => {
                      handleCloseBolsa();
                    }}
                  >
                    {currentBolsa.closed === "open" ? "Cerrar anuncio" : "Abrir anuncio"}
                  </button>

                  {editBolsa ? (
                    <>
                      <button onClick={() => setEditBolsa(false)}>Cancelar</button>
                      <button
                        onClick={() => {
                          currentBolsa.id ? handleUpdateBolsa() : handleCreateBolsa();
                        }}
                      >
                        Aceptar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditBolsa(true);
                        setCurrentEditedBolsa(currentBolsa);
                        setNombreBolsa(currentBolsa.nombre || "");
                        setUbicacionBolsa(currentBolsa.ubicacion || "");
                        setModalidadBolsa(currentBolsa.modalidad || "");
                        setDisponibilidadBolsa(currentBolsa.disponibilidad || "");
                        setDescripcionBolsa(currentBolsa.info.descripcion || "");
                        setResponsabilidadesBolsa(currentBolsa.info.responsabilidades || []);
                        setRequisitosBolsa(currentBolsa.info.requisitos || []);
                        setCandidatosBolsa(currentBolsa.info.candidatos || []);
                        setClosedBolsa(currentBolsa.closed);
                      }}
                    >
                      Editar
                    </button>
                  )}
                  {!editBolsa && (
                    <button
                      onClick={() => {
                        deteleBolsa(currentBolsa);
                        setCurrentBolsa({});
                        setEditBolsa(false);
                      }}
                    >
                      Eliminar
                    </button>
                  )}
                  <NavLink to={`/adminRRHHRecruitGroup/bolsaDeTrabajo/${currentBolsa.id}`}>Ver candidatos</NavLink>
                </div>
              </form>
            ) : (
              <h4>Selecciona una bolsa</h4>
            )}
          </div>
        </div>
        {openModal && (
          <form className="formModalBolsaDeTrabajo" onSubmit={handleSubmit}>
            <h2>Agregar {currentFormData.charAt(0).toUpperCase() + currentFormData.slice(1)}</h2>
            {currentFormData === "responsabilidades" ? (
              modalFormResponsabilidades ? (
                modalFormResponsabilidades.map((responsabilidad, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`agregar ${currentFormData}`}
                    value={responsabilidad}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                ))
              ) : (
                <input
                  key={0}
                  type="text"
                  placeholder={`agregar ${currentFormData}`}
                  value={""}
                  onChange={(event) => handleInputChange(0, event)}
                />
              )
            ) : modalFormRequisitos ? (
              modalFormRequisitos.map((responsabilidad, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`agregar ${currentFormData}`}
                  value={responsabilidad}
                  onChange={(event) => handleInputChange(index, event)}
                />
              ))
            ) : (
              <input
                key={0}
                type="text"
                placeholder={`agregar ${currentFormData}`}
                value={""}
                onChange={(event) => handleInputChange(0, event)}
              />
            )}

            <button type="button" onClick={handleAgregarResponsabilidad}>
              Agregar {currentFormData.charAt(0).toUpperCase() + currentFormData.slice(1)}
            </button>
            <button type="submit">Guardar {currentFormData.charAt(0).toUpperCase() + currentFormData.slice(1)}</button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Cerrar
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BolsaDeTrabajoPanel;
