import React, { useRef } from "react";
import "../styles/contacto.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import contactoBanner from "/contactos/contacto.png";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ContactoPage = () => {
  const form = useRef();

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

  const onSubmit = (data) => {
    emailjs
      .send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID_CONTACT, data, {
        publicKey: import.meta.env.VITE_YOUR_PUBLIC_KEY
      })
      .then(
        () => {
          resetField("email");
          resetField("formBody");
          resetField("nombre");
          resetField("apellido");
          resetField("asunto");
          resetField("telefono");

          toast.success("Gracias por contactarnos!", {
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
        <title>Contacto</title>
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
      <div className="contactoPageBanner">
        <img src={contactoBanner} alt="" />
      </div>

      <div className="contactMain">
        <h2>ENVIANOS UN MENSAJE</h2>
        <form ref={form} action="" className="contactForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="contactFormInputContainer">
            <input type="text" id="nombre" placeholder="Nombre" {...register("nombre", { required: true })} />
            {errors.email?.type === "required" && (
              <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                El nombre es requerido!
              </p>
            )}
            <input type="text" id="apellido" placeholder="Apellido" {...register("apellido", { required: true })} />
            {errors.email?.type === "required" && (
              <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
                El apellido es requerido!
              </p>
            )}
          </div>

          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              El email es requerido!
            </p>
          )}
          {errors?.email?.types?.pattern && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3">Ingresa un email válido.</p>
          )}

          <input type="telefono" id="telefono" placeholder="Telefono" {...register("telefono", { required: true })} />
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              El telefono es requerido!
            </p>
          )}

          <input type="asunto" id="asunto" placeholder="Asunto" {...register("asunto", { required: true })} />
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              El asunto es requerido!
            </p>
          )}

          <textarea
            id="mensaje"
            placeholder="Mensaje"
            {...register("formBody", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          ></textarea>
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              Es necesario redactar un mensaje...
            </p>
          )}
          <button type="submit">ENVIAR</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactoPage;
