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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel tristique mauris. Aliquam nec lectus
                egestas, pretium felis id, sodales tortor.
              </p>
            </div>
            <div>
              <h3>INNOVACIÓN:</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel tristique mauris. Aliquam nec lectus
                egestas, pretium felis id, sodales tortor..
              </p>
            </div>
            <div>
              <h3>RESULTADOS:</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel tristique mauris. Aliquam nec lectus
                egestas, pretium felis id, sodales tortor.
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
