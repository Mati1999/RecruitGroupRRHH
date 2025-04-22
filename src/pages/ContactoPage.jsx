import React, { useRef } from "react";
import Header from "../components/Header";
import imgBanner from "/imgBanner.png";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

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
      .send(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID, data, {
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

    console.log(data);
  };

  return (
    <div>
      <Header />
      <div className="bolsaDeTrabajoPageBanner">
        <img src={imgBanner} alt="" />
      </div>

      <form ref={form} action="" className="contactForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="contactFormInputContainer">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" placeholder="Nombre" {...register("nombre", { required: true })} />
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              El nombre es requerido!
            </p>
          )}
          <label htmlFor="apellido">Apellido</label>
          <input type="text" id="apellido" placeholder="apellido" {...register("apellido", { required: true })} />
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              El apellido es requerido!
            </p>
          )}
        </div>

        <div className="contactFormInputContainer">
          <label htmlFor="email">Email</label>
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
        </div>
        <div className="contactFormInputContainer">
          <label htmlFor="telefono">Número de teléfono</label>
          <input type="telefono" id="telefono" placeholder="telefono" {...register("telefono", { required: true })} />
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              El telefono es requerido!
            </p>
          )}
        </div>
        <div className="contactFormInputContainer">
          <label htmlFor="asunto">Asunto</label>
          <input type="asunto" id="asunto" placeholder="asunto" {...register("asunto", { required: true })} />
          {errors.email?.type === "required" && (
            <p className="bg-red-400 text-white pl-3 rounded-md w-1/3" role="alert">
              El asunto es requerido!
            </p>
          )}
        </div>
        <div className="contactFormInputContainer">
          <label htmlFor="mensaje">Mensaje</label>
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
        </div>
        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
};

export default ContactoPage;
