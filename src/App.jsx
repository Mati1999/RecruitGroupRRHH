import "./App.scss";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import InfiniteCarousel from "./components/InfiniteCarousel";
import ServiciosSection from "./components/ServiciosSection";
import Testimonios from "./components/Testimonios";
import HomeCrecemosConVos from "/bannersHome/HomeCrecemosConVos.png";
import Footer from "./components/Footer";
import { NavLink } from "react-router";

function App() {
  return (
    <>
      <title>Recruit Group</title>
      <meta
        name="description"
        content="Recruit Consultora es una agencia de trabajo y consultora de recursos humanos con enfoque clínico y organizacional. Expertos en selección de personal, evaluaciones psicológicas y portal de empleo en Mendoza."
      />
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

        <div className="buscasTrabajoMendoza">
          <h1>¿BUSCAS TRABAJO EN MENDOZA?</h1>
          <p>
            Si buscás trabajo y querés avanzar en tu carrera profesional, llegaste al lugar indicado. En nuestra
            plataforma de búsqueda laboral en Mendoza, te conectamos con las mejores oportunidades del mercado. Ya sea
            que estés empezando, quieras cambiar de rubro o crecer dentro de tu sector, te ayudamos a encontrar el
            empleo ideal.
          </p>
          <NavLink to="/bolsa-de-trabajo">
            <button className="w-1/2 md:1/10 text-center">IR A BOLSA DE TRABAJO</button>
          </NavLink>
        </div>
        <Testimonios />
        <InfiniteCarousel />
        <Footer />
      </main>
    </>
  );
}

export default App;
