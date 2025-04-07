import { useEffect, useRef } from "react";
import "./App.scss";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import InfiniteCarousel from "./components/InfiniteCarousel";
import ServiciosSection from "./components/ServiciosSection";
import Testimonios from "./components/Testimonios";
import crecemosConVos from "../public/crecemosConVos.png";
import Footer from "./components/Footer";
import { useResource } from "./recursos";
import { auth } from "./firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const estadoBolsaActualizado = useRef(false);
  const estadoCandidatosActualizado = useRef(false);
  const getBolsa = useResource((resource) => resource.getBolsa);
  const setBolsa = useResource((resource) => resource.setBolsa);
  const updateBolsa = useResource((resource) => resource.updateBolsa);
  const deteleBolsa = useResource((resource) => resource.deteleBolsa);
  const getCandidatos = useResource((resource) => resource.getCandidatos);
  const setCantidatos = useResource((resource) => resource.setCantidatos);
  const deteleCandidato = useResource((resource) => resource.deteleCandidato);
  const updateCandidatos = useResource((resource) => resource.updateCandidatos);
  const bolsa = useResource((resource) => resource.bolsa);
  const candidatos = useResource((resource) => resource.candidatos);

  useEffect(() => {
    if (!estadoBolsaActualizado.current) {
      getBolsa();
      estadoBolsaActualizado.current = true;
    }
    console.log("bolsa actualizada:", bolsa);
  }, [getBolsa, setBolsa, updateBolsa, deteleBolsa, bolsa]);

  useEffect(() => {
    if (!estadoCandidatosActualizado.current) {
      getCandidatos();
      estadoCandidatosActualizado.current = true;
    }
    console.log("candidatos actualizados:", candidatos);
  }, [getCandidatos, setCantidatos, deteleCandidato, updateCandidatos, candidatos]);

  const addDocsToFirebase = async () => {
    await setBolsa({
      nombre: "agregado nuevo",
      ubicacion: "",
      modalidad: "",
      info: { descripcion: "", responsabilidades: [""], requisitos: [""] },
      candidatos: []
    });
  };

  const deleteDocsToFirebase = async (idBolsa) => {
    await deteleBolsa(idBolsa);
  };

  const updateDocsToFirebase = async () => {
    let bolsa = {
      nombre: "test actualizado",
      ubicacion: "",
      modalidad: "",
      info: { descripcion: "", responsabilidades: [""], requisitos: [""] },
      candidatos: [],
      id: "TBv6vaN6EMUoZFk4VEoV"
    };
    await updateBolsa(bolsa, true, false);
  };

  const updateDeleteDocsToFirebase = async () => {
    let bolsa = {
      nombre: "test actualizado",
      ubicacion: "",
      modalidad: "",
      info: { descripcion: "", responsabilidades: [""], requisitos: [""] },
      candidatos: [
        {
          apellido: "aguiTest",
          cv: "",
          nombre: "matiTest",
          anosExp: 0,
          aptoPsico: false,
          estudios: "",
          foto: "",
          profesion: "",
          id: "ONnxRyEBG96DNsgMXdiD"
        }
      ],
      id: "aqKKTzGQQxxE5Wtk4XeC"
    };
    await updateBolsa(bolsa, false, "test1@cand.com");
  };

  const addCandToFirebase = async () => {
    await setCantidatos({
      apellido: "aguiTest",
      cv: "",
      nombre: "matiTest",
      anosExp: 0,
      aptoPsico: false,
      estudios: "",
      foto: "",
      profesion: "",
      email: "cand@test1.com"
    });
  };

  const deleteCandToFirebase = async (idCandidato) => {
    await deteleCandidato(idCandidato);
  };

  const updateCandToFirebase = async () => {
    let newCantidato = {
      apellido: "aguiTest",
      cv: "",
      nombre: "matiTestModificadojejeje",
      anosExp: 0,
      aptoPsico: false,
      estudios: "",
      foto: "",
      profesion: "",
      email: "cand@test1.com",
      id: "m0MZOawyU98H1qDTXzbJ"
    };
    await updateCandidatos(newCantidato);
  };

  const submitAuth = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, e.target.elements[0].value, e.target.elements[1].value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error(errorCode);
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };
  const submitSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, e.target.elements[0].value, e.target.elements[1].value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
      <main>
        <button onClick={() => addDocsToFirebase()}>AGREGAR DATA</button>
        <button onClick={() => deleteDocsToFirebase({ id: "9puD4FFXIb2lhYb2LTIv" })}>DELETE DATA</button>
        <button onClick={() => updateDocsToFirebase()}>UPDATE DATA</button>
        <button onClick={() => updateDeleteDocsToFirebase()}>UPDATE Delete DATA</button>
        <button onClick={() => addCandToFirebase()}>AGREGAR CAND</button>
        <button onClick={() => deleteCandToFirebase({ id: "o0ewGCWgA0GzZRvB8TuD", email: "cand@test1.com" })}>
          DELETE CAND
        </button>
        <button onClick={() => updateCandToFirebase()}>UPDATE DATA</button>
        <form onSubmit={(e) => submitAuth(e)}>
          <input type="email" />
          <input type="text" />
          <button type="submit">submit</button>
        </form>
        <form onSubmit={(e) => submitSignIn(e)}>
          <input type="email" />
          <input type="text" />
          <button type="submit">submit</button>
        </form>
        <Carousel />
        <ServiciosSection />
        <InfiniteCarousel />
        <Testimonios />
        <div className="crecemosConVos">
          <div>
            <h3>POR QUE ELEGIR RECRUIT:</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dicta veritatis natus et. Architecto est
              provident esse rem ullam rerum reiciendis, quam mollitia molestiae enim nisi autem tenetur excepturi
              obcaecati.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dicta veritatis natus et.
              Architecto est provident esse rem ullam rerum reiciendis, quam mollitia molestiae enim nisi autem tenetur
              excepturi obcaecati.
            </p>
          </div>
          <img src={crecemosConVos} alt="" />
        </div>

        {}
        <Footer />
      </main>
    </>
  );
}

export default App;
