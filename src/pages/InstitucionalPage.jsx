import React from "react";
import Header from "../components/Header";
import imgBanner from "/imgBanner.png";
import institucionalImg1 from "/institucionalImg1.png";
import agusImg from "/agusImg.png";
import romiImg from "/romiImg.png";
import daniImg from "/daniImg.png";
import luciImg from "/luciImg.png";
import Footer from "../components/Footer";

const InstitucionalPage = () => {
  return (
    <div>
      <Header />
      <div className="bolsaDeTrabajoPageBanner">
        <img src={imgBanner} alt="" />
      </div>

      <main className="institucionarMain">
        <div>
          <div>
            <h2>¿QUIENES SOMOS?</h2>
            <p>
              Somos Recruit Group, una consultora de recursos humanos que nació hace tres años de la mano de dos amigas
              psicólogas con una meta clara: adentrarse en el mundo de los RRHH y aportar valor a las organizaciones a
              través de nuestras capacidades y experiencia. Iniciamos nuestra historia ofreciendo el servicio de
              reclutamiento, enfocado en la búsqueda y selección de talento, y con el tiempo hemos ido creciendo y
              diversificando nuestras áreas de trabajo, logrando un enfoque integral en los servicios que brindamos.
            </p>
          </div>
          <img src={institucionalImg1} alt="" />
        </div>
        <div>
          <img src={institucionalImg1} alt="" />
          <div>
            <p>
              Hoy, contamos con un equipo sólido y capacitado, que trabaja con pasión y compromiso. A lo largo de estos
              años, hemos incorporado servicios como el diagnóstico organizacional, la administración de psicotécnicos,
              la tercerización del área de RRHH y muchas otras soluciones que diseñamos a medida para cada cliente.
            </p>
            <p>
              Aunque como consultora tenemos tres años en el mercado, nuestras fundadoras llevan más de ocho años de
              experiencia en el rubro, lo que nos permite entender a profundidad las necesidades y desafíos de las
              organizaciones. Nuestra prioridad es brindar un servicio personalizado y de calidad, asegurándonos de
              acompañar a cada empresa con un seguimiento cercano y adaptado a sus metas y particularidades.
            </p>
          </div>
        </div>
        <div>
          <h2>¿QUÉ NOS DISTINGUE?</h2>
          <p>
            Nuestros conocimientos y experiencia en salud mental nos brinda un abanico de oportunidades al momento de
            brindar nuestros servicios. Estamos capacitados para realizar evaluaciones psicológicas profundas, para así
            entender mejor la personalidad y competencias de los empleados y candidatos. También, nos permite ayudar en
            el desarrollo de talento interno mediante programas de formación personalizado, realizar diagnósticos
            organizacionales sobre el clima laboral y proponer intervenciones para mejorar el bienestar y satisfacción
            de tus empleados, mediar en casos de conflictos para encontrar la mejor solución, y nos da una visión
            estratégica para analizar dinámicas grupales.
          </p>
        </div>
        <div>
          <h2>NUESTRO EQUIPO</h2>
          <div>
            <div>
              <img src={agusImg} alt="" />
              <h3>Agustina Marini</h3>
              <p>Psicóloga y fundadora</p>
              <p>Mat 3351</p>
            </div>
            <div>
              <img src={romiImg} alt="" />
              <h3>Romina Abdala</h3>
              <p>Psicóloga y fundadora</p>
              <p>Mat 3617</p>
            </div>
            <div>
              <img src={daniImg} alt="" />
              <h3>Daniel Cebreros</h3>
              <p>Psicólogo clínico</p>
              <p>Mat 1886</p>
            </div>
            <div>
              <img src={luciImg} alt="" />
              <h3>Lucia Pecoraro</h3>
              <p>Recruiter</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstitucionalPage;
