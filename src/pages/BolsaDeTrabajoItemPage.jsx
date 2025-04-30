import React, { useEffect, useRef, useState } from "react";
import { useResource } from "../recursos";
import { useParams } from "react-router";
import bolsaDeTrabajoBanner from "/bolsaDeTrabajo/bolsaDeTrabajoBanner.png";
import Header from "../components/Header";
import "../../styles/bolsadetrabajoitempage.scss";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const BolsaDeTrabajoItemPage = () => {
  const estadoBolsaActualizado = useRef(false);
  const updateBolsa = useResource((resource) => resource.updateBolsa);
  const getBolsa = useResource((resource) => resource.getBolsa);
  const bolsa = useResource((resource) => resource.bolsa);
  const [bolsaActual, setBolsaActual] = useState([]);
  const [formNombre, setFormNombre] = useState("");
  const [formApellido, setFormApellido] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTelefono, setFormTelefono] = useState("");
  const [formMotivo, setFormMotivo] = useState("");
  const [formCv, setFormCv] = useState("");
  let { bolsaId } = useParams();

  useEffect(() => {
    if (!estadoBolsaActualizado.current) {
      setBolsaActual([bolsa.find((item) => item.id === bolsaId)]);
      estadoBolsaActualizado.current = true;
    }
  }, [getBolsa, updateBolsa, bolsa, bolsaId]);

  const submitForm = async () => {
    let candidato = {
      nombre: formNombre || "" + " " + formApellido || "",
      email: formEmail || "",
      telefono: formTelefono || "",
      motivo: formMotivo || "",
      cv: formCv || ""
    };

    setFormNombre("");
    setFormApellido("");
    setFormEmail("");
    setFormTelefono("");
    setFormMotivo("");
    setFormCv("");

    resetField("email");
    resetField("motivo");
    resetField("nombre");
    resetField("apellido");
    resetField("cv");
    resetField("telefono");

    toast.success("Gracias por postularte!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    await updateBolsa(bolsaActual[0], candidato, false);
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      formBody: "",
      nombre: "",
      apellido: "",
      asunto: "",
      telefono: ""
    },
    criteriaMode: "all"
  });

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
      <div className="bolsaDeTrabajoItemPageBanner">
        <img src={bolsaDeTrabajoBanner} alt="" />
      </div>
      {bolsaActual
        ? bolsaActual.map((item, i) => (
            <main key={i} className="bolsaDeTrabajoItemMain">
              <div className="bolsaDeTrabajoItemMain-info">
                <h2>{item.nombre}</h2>
                <p className="bolsaDeTrabajoItemMain-info_ubicacion">
                  Ubicación: <span>{item.ubicacion}</span>
                </p>
                <p className="bolsaDeTrabajoItemMain-info_modalidad">
                  Modalidad: <span>{item.modalidad}</span>
                </p>
                <p className="bolsaDeTrabajoItemMain-info_descripcion">{item.info.descripcion}</p>
                <div className="bolsaDeTrabajoItemMain-info_responsabilidades">
                  <p>Responsabilidades:</p>
                  <ul>
                    {item.info.responsabilidades.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
                <div className="bolsaDeTrabajoItemMain-info_requisitos">
                  <p>Requisitos:</p>
                  <ul>
                    {item.info.requisitos.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <h2>¡POSTULATE!</h2>

              <form onSubmit={handleSubmit(submitForm)}>
                <div>
                  <div>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      placeholder="Nombre:"
                      {...register("nombre", { required: true })}
                      value={formNombre}
                      onChange={(e) => setFormNombre(e.target.value)}
                    />
                    {errors.nombre?.type === "required" && (
                      <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                        El nombre es requerido!
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="apellido"
                      id="apellido"
                      placeholder="Apellido:"
                      {...register("apellido", { required: true })}
                      value={formApellido}
                      onChange={(e) => setFormApellido(e.target.value)}
                    />
                    {errors.apellido?.type === "required" && (
                      <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                        El apellido es requerido!
                      </p>
                    )}
                  </div>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                  {...register("email", { required: true })}
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
                {errors.email?.type === "required" && (
                  <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                    El email es requerido!
                  </p>
                )}
                <input
                  type="number"
                  name="telefono"
                  id="telefono"
                  placeholder="Teléfono:"
                  {...register("telefono", { required: true })}
                  value={formTelefono}
                  onChange={(e) => setFormTelefono(e.target.value)}
                />
                {errors.telefono?.type === "required" && (
                  <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                    El telefono es requerido!
                  </p>
                )}
                <textarea
                  name="motivo"
                  id="motivo"
                  placeholder="¿Por qué te gustaría postular?"
                  {...register("motivo", { required: true })}
                  value={formMotivo}
                  onChange={(e) => setFormMotivo(e.target.value)}
                ></textarea>
                {errors.motivo?.type === "required" && (
                  <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                    El motivo es requerido!
                  </p>
                )}
                <div>
                  <span>Adjunta tu CV en .PDF</span>
                  <input
                    type="file"
                    name="curriculum"
                    id="curriculum"
                    {...register("cv", { required: true })}
                    accept=".pdf"
                    onChange={(e) => setFormCv(e.target.files[0])}
                  />
                  {errors.cv?.type === "required" && (
                    <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                      El cv es requerido!
                    </p>
                  )}
                </div>
                <button type="submit">ENVIAR</button>
              </form>
            </main>
          ))
        : "No hay nada"}
      <Footer />
    </>
  );
};

export default BolsaDeTrabajoItemPage;
