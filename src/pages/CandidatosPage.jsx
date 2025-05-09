import React, { useEffect, useRef, useState } from "react";
import "../styles/candidatospage.scss";
import Header from "../components/Header";
import candidatosBanner from "/candidatos/candidatos.png";
import { useResource } from "../recursos";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

const CandidatosPage = () => {
  const estadoCandidatosActualizado = useRef(false);
  const getCandidatos = useResource((resource) => resource.getCandidatos);
  const candidatos = useResource((resource) => resource.candidatos);
  const [currentCand, setCurrentCand] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!estadoCandidatosActualizado.current) {
      getCandidatos();
      estadoCandidatosActualizado.current = true;
    }
  }, [getCandidatos, candidatos]);

  const form = useRef();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      empresa: "",
      nombre: "",
      apellido: "",
      asunto: "",
      telefono: ""
    },
    criteriaMode: "all"
  });

  const onSubmit = (data) => {
    data = { ...data, asunto: `${currentCand.nombre}` };
    emailjs
      .send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID_CANDIDATO, data, {
        publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY
      })
      .then(
        () => {
          resetField("email");
          resetField("empresa");
          resetField("nombre");
          resetField("apellido");
          resetField("telefono");

          toast.success("Gracias por contactarte!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Candidatos</title>
        <meta name="description" content="Free Web tutorials" />
      </Helmet>
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
      <div className="candidatosPageBanner">
        <img src={candidatosBanner} alt="" />
      </div>
      <div className="candidatosPageMain">
        <div className="candidatosPageMainContainer">
          {candidatos.length != 0
            ? candidatos.map((item, i) => (
                <div key={i} className="candidatosPageItem">
                  <div>
                    {item.foto ? <img loading="lazy" src={item.foto} alt="" /> : <ion-icon name="person"></ion-icon>}
                    <button
                      onClick={() => {
                        setCurrentCand(item);
                        setShowModal(true);
                      }}
                    >
                      Solicitar información
                    </button>
                  </div>
                  <h2>
                    {item.nombre} {item.apellido}
                  </h2>
                  <p> {item.profesion}</p>
                  <p> {item.anosExp} años de experiencia</p>
                </div>
              ))
            : "Por ahora no hay candidatos publicados."}
        </div>
      </div>
      {showModal && (
        <div className="solicitarInfoModal">
          <form ref={form} action="" onSubmit={handleSubmit(onSubmit)}>
            <button
              className="modalCloseButton"
              onClick={() => {
                setShowModal(false);
              }}
            >
              X
            </button>
            <div>
              <div>
                <input type="text" name="nombre" placeholder="Nombre" {...register("nombre", { required: true })} />
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
                  placeholder="Apellido"
                  {...register("apellido", { required: true })}
                />
                {errors.apellido?.type === "required" && (
                  <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                    El apellido es requerido!
                  </p>
                )}
              </div>
            </div>
            <div className="empresa">
              <input type="text" name="empresa" placeholder="Empresa" {...register("empresa", { required: true })} />
              {errors.empresa?.type === "required" && (
                <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                  El nombre del empresa es requerido!
                </p>
              )}
            </div>
            <div className="email">
              <input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                })}
              />
              {errors.email?.type === "required" && (
                <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                  El email es requerido!
                </p>
              )}
            </div>

            <div className="telefono">
              <input
                type="number"
                name="telefono"
                placeholder="Teléfono"
                {...register("telefono", { required: true })}
              />
              {errors.telefono?.type === "required" && (
                <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                  El telefono es requerido!
                </p>
              )}
            </div>
            <button type="submit">Solicitar información</button>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CandidatosPage;
