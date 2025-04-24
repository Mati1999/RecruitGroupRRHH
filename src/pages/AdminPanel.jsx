import React from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useResource } from "../recursos";
import { NavLink } from "react-router";
import Header from "../components/Header";
import "../../styles/adminPanel.scss";
import Footer from "../components/Footer";

const AdminPanel = () => {
  const logedIn = useResource((resource) => resource.logedIn);
  const setLogedIn = useResource((resource) => resource.setLogedIn);

  const submitSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, e.target.children[0].value, e.target.children[1].value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLogedIn(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error(errorCode);
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  return (
    <>
      <Header />
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
              <input type="email" placeholder="email" />
              <input type="text" placeholder="contraseña" />
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
