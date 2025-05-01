import "./App.scss";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import InfiniteCarousel from "./components/InfiniteCarousel";
import ServiciosSection from "./components/ServiciosSection";
import Testimonios from "./components/Testimonios";
import HomeCrecemosConVos from "/bannersHome/HomeCrecemosConVos.png";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="appMain">
        <Carousel />
        <ServiciosSection />
        <div className="crecemosConVos">
          <div className="infoContainer">
            <h2>POR QUE RECRUIT:</h2>
            <div>
              <h3>PROFESIONALES DE SALUD MENTAL:</h3>
              <p>
                Somos un equipo integrado por psicólogos clínicos con sólida trayectoria en evaluación diagnóstica,
                recursos humanos y acompañamiento organizacional, garantizando rigor técnico y comprensión profunda de
                tus necesidades.
              </p>
            </div>
            <div>
              <h3>INNOVACIÓN:</h3>
              <p>
                Empleamos técnicas actualizadas, baremadas según estándares internacionales y adaptadas a tus
                necesidades corporativas, dejando atrás métodos genéricos.
              </p>
            </div>
            <div>
              <h3>RESULTADOS:</h3>
              <p>
                Logramos impactos visibles y medibles. Brindamos acompañamiento continuo para maximizar el retorno de
                inversión en tu capital humano. Además, ofrecemos garantía de nuestros servicios.
              </p>
            </div>
          </div>
          <img src={HomeCrecemosConVos} alt="" />
        </div>
        <Testimonios />
        <InfiniteCarousel />
        <Footer />
      </main>
    </>
  );
}

export default App;
