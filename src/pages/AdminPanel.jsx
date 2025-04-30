import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useResource } from "../recursos";
import { NavLink } from "react-router";
import Header from "../components/Header";
import "../styles/adminpanel.scss";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";

const AdminPanel = () => {
  const logedIn = useResource((resource) => resource.logedIn);
  const setLogedIn = useResource((resource) => resource.setLogedIn);

  const [logInCounter, setLogInCounter] = useState(0);

  const submitSignIn = (e) => {
    e.preventDefault();

    console.log("env", import.meta.env.VITE_PSWLI);
    console.log(e.target.children[1].value);
    console.log(e.target.children[1].value !== import.meta.env.VITE_PSWLI);

    // Si ya se excedieron los intentos y la contraseña no es correcta, no hacer nada
    if (logInCounter >= 1 && e.target.children[1].value !== import.meta.env.VITE_PSWLI) {
      console.error("Demasiados intentos fallidos. Inténtalo de nuevo más tarde o ingresa la contraseña correcta.");
      toast.error("Contraseña incorrecta", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      return;
    } else if (e.target.children[1].value !== import.meta.env.VITE_PSWLI) {
      toast.error("Contraseña incorrecta", {
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

    signInWithEmailAndPassword(auth, e.target.children[0].value, e.target.children[1].value)
      .then((userCredential) => {
        const user = userCredential.user;
        setLogedIn(user); // Actualiza el estado de logueo a true
        setLogInCounter(0); // Resetea el contador de intentos fallidos
      })
      .catch((error) => {
        setLogInCounter(logInCounter + 1);
        const errorCode = error.code;
        console.error(errorCode);
        const errorMessage = error.message;
        console.error(errorMessage);
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
      <div className="adminMain">
        {logedIn ? (
          <>
            <div className="adminLogedIn">
              <h2>HOLA RECRUIT</h2>
              <p>
                Este es el perfil de administrador. Aqui podras ver, agregar, editar y eliminar candidatos y/o puestos
                de trabajo, y ver los CV de postulantes de la bolsa de trabajo.{" "}
              </p>
              <div className="adminButtons">
                <div className="adminContainer__candidatos">
                  <NavLink to="/adminRRHHRecruitGroup/candidatos">IR A CANDIDATOS</NavLink>
                </div>
                <div className="adminContainer__bolsa">
                  <NavLink to="/adminRRHHRecruitGroup/bolsaDeTrabajo">IR A BOLSA DE TRABAJO</NavLink>
                </div>
              </div>
              <button onClick={() => setLogedIn(false)}>Cerrar Sesión</button>
            </div>
          </>
        ) : (
          <div className="adminFormDiv">
            <h2>HOLA RECRUIT</h2>
            <form onSubmit={(e) => submitSignIn(e)}>
              <input id="email" type="email" placeholder="email" />
              <input id="password" type="text" placeholder="contraseña" />
              <button type="submit">Iniciar Sesión</button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
