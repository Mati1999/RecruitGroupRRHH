import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import imgBanner from "/imgBanner.png";
import { useResource } from "../recursos";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

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
    console.log("candidatos actualizados:", candidatos);
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
    data = { ...data, asunto: `${currentCand.nombre} ${currentCand.apellido}` };
    emailjs
      .send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID, data, {
        publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY
      })
      .then(
        () => {
          resetField("email");
          resetField("empresa");
          resetField("nombre");
          resetField("apellido");
          resetField("asunto");
          resetField("telefono");

          // Toastify({
          //   text: "Gracias por contactarte con nosotros!",
          //   duration: 3000,
          //   destination: "https://github.com/apvarun/toastify-js",
          //   newWindow: true,
          //   close: true,
          //   gravity: "top", // `top` or `bottom`
          //   position: "right", // `left`, `center` or `right`
          //   stopOnFocus: true, // Prevents dismissing of toast on hover
          //   style: {
          //     background: "linear-gradient(to right, #00b09b, #96c93d)"
          //   },
          //   onClick: function () {} // Callback after click
          // }).showToast();
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );

    console.log(currentCand);

    console.log(data);
  };

  return (
    <div>
      <Header />
      <div className="bolsaDeTrabajoPageBanner">
        <img src={imgBanner} alt="" />
      </div>
      {candidatos.length != 0
        ? candidatos.map((item, i) => (
            <div key={i} className="candidatosPageItem">
              <h2>
                {item.nombre} {item.apellido}
              </h2>
              <p> {item.profesion}</p>
              <p> {item.anosExp} años de experiencia</p>
              <button
                onClick={() => {
                  setCurrentCand(item);
                  setShowModal(true);
                }}
              >
                Solicitar información
              </button>
            </div>
          ))
        : "No hay nada"}
      {showModal && (
        <div className="solicitarInfoModal">
          <form ref={form} action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="nombre" placeholder="Nombre" {...register("nombre", { required: true })} />
            {errors.email?.type === "required" && (
              <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                El email es requerido!
              </p>
            )}
            <input type="text" name="apellido" placeholder="Apellido" {...register("apellido", { required: true })} />
            {errors.email?.type === "required" && (
              <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                El email es requerido!
              </p>
            )}
            <input type="text" name="empresa" placeholder="Empresa" {...register("empresa", { required: true })} />
            {errors.email?.type === "required" && (
              <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                El email es requerido!
              </p>
            )}
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
            <input type="tel" name="telefono" placeholder="Teléfono" {...register("telefono", { required: true })} />
            {errors.email?.type === "required" && (
              <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                El email es requerido!
              </p>
            )}
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CandidatosPage;
