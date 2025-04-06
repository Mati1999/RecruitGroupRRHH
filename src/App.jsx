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
    await setBolsa({ ...bolsa[0], nombre: "agregado nuevo" });
    await getBolsa();
  };

  const deleteDocsToFirebase = async (idBolsa) => {
    await deteleBolsa(idBolsa);
    await getBolsa();
  };

  const updateDocsToFirebase = async () => {
    let bolsa = {
      nombre: "test actualizado",
      ubicacion: "",
      modalidad: "",
      info: { descripcion: "", responsabilidades: [""], requisitos: [""] },
      candidatos: [],
      id: "aqKKTzGQQxxE5Wtk4XeC"
    };
    await updateBolsa(bolsa, true);
    await getBolsa();
  };

  const addCandToFirebase = async () => {
    await setCantidatos({ ...candidatos[0], nombre: "agregado nuevo" });
    await getCandidatos();
  };

  const deleteCandToFirebase = async (idCandidato) => {
    await deteleCandidato(idCandidato);
    await getCandidatos();
  };

  const updateCandToFirebase = async () => {
    let newCantidato = {
      apellido: "aguiTest",
      cv: "",
      nombre: "matiTest",
      anosExp: 0,
      aptoPsico: false,
      estudios: "",
      foto: "",
      profesion: "",
      id: "ONnxRyEBG96DNsgMXdiD"
    };
    await updateCandidatos(newCantidato);
    await getCandidatos();
  };

  return (
    <>
      <Header />
      <main>
        <button onClick={() => addDocsToFirebase()}>AGREGAR DATA</button>
        <button onClick={() => deleteDocsToFirebase("fLpc4fK8WVRkx4mykb7t")}>DELETE DATA</button>
        <button onClick={() => updateDocsToFirebase()}>UPDATE DATA</button>
        <button onClick={() => addCandToFirebase()}>AGREGAR CAND</button>
        <button onClick={() => deleteCandToFirebase("1ngHJnxz7ClOWTT1D6mc")}>DELETE CAND</button>
        <button onClick={() => updateCandToFirebase()}>UPDATE DATA</button>
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
