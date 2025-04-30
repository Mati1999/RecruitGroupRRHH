import React from "react";
import Header from "../components/Header";
import somorRecruitBanner from "/institucional/somosRecruit.png";
import institucionalImg1 from "/institucional/imagen1.jpg";
import institucionalImg2 from "/institucional/imagen2.jpg";
import agusImg from "/institucional/AGUSTINA.jpg";
import romiImg from "/institucional/ROMINA.jpg";
import daniImg from "/institucional/DANIEL.jpg";
import luciImg from "/institucional/LUCIA.jpg";
import Footer from "../components/Footer";
import linkedIn from "/linkedInLogo.png";
import "../styles/institucionalpage.scss";
import { NavLink } from "react-router";

const InstitucionalPage = () => {
  return (
    <>
      <Header />
      <div className="institucionalPageBanner">
        <img src={somorRecruitBanner} alt="" />
      </div>

      <main className="institucionalMain">
        <div className="institucionalMain-quienesSomos">
          <div>
            <h2>¿QUIENES SOMOS?</h2>
            <p>
              Somos <b>Recruit Group</b>, una consultora de recursos humanos que nació hace tres años de la mano de dos
              amigas psicólogas con una meta clara: adentrarse en el mundo de los RRHH y aportar valor a las
              organizaciones a través de nuestras capacidades y experiencia. Iniciamos nuestra historia ofreciendo el
              servicio de reclutamiento, enfocado en la búsqueda y selección de talento, y con el tiempo hemos ido
              creciendo y diversificando nuestras áreas de trabajo, logrando un enfoque integral en los servicios que
              brindamos.
            </p>
          </div>
          <img src={institucionalImg1} alt="" />
        </div>
        <div className="institucionalMain-quienesSomos2">
          <img src={institucionalImg2} alt="" />
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
        <div className="institucionalMain-queNosDistingue">
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
        <div className="institucionalMain-nuestroEquipo">
          <h2>NUESTRO EQUIPO</h2>
          <div className="institucionalMain-quienesSomos_contenedor">
            <div>
              <div>
                <a href="https://www.linkedin.com/in/agustina-marini-946161252/" target="_blank">
                  <img className="profileLinkedIn" src={linkedIn} alt="" />
                </a>
                <img className="profileImg" src={agusImg} alt="" />
              </div>
              <h3>Agustina Marini</h3>
              <p>Psicóloga y fundadora</p>
              <p>Mat 3351</p>
            </div>
            <div>
              <div>
                <a href="https://www.linkedin.com/in/romina-abdala-2396981a7/" target="_blank">
                  <img className="profileLinkedIn" src={linkedIn} alt="" />
                </a>
                <img className="profileImg" src={romiImg} alt="" />
              </div>
              <h3>Romina Abdala</h3>
              <p>Psicóloga y fundadora</p>
              <p>Mat 3617</p>
            </div>
            <div>
              <div>
                <a href="https://www.linkedin.com/in/daniel-cebreros-6b790018/" target="_blank">
                  <img className="profileLinkedIn" src={linkedIn} alt="" />
                </a>
                <img className="profileImg" src={daniImg} alt="" />
              </div>
              <h3>Daniel Cebreros</h3>
              <p>Psicólogo clínico</p>
              <p>Mat 1886</p>
            </div>
            <div>
              <div>
                <a href="https://www.linkedin.com/in/lucia-pecoraro-psicolog%C3%ADa/" target="_blank">
                  <img className="profileLinkedIn" src={linkedIn} alt="" />
                </a>
                <img className="profileImg" src={luciImg} alt="" />
              </div>
              <h3>Lucia Pecoraro</h3>
              <p>Recruiter</p>
            </div>
          </div>
        </div>

        <div className="institucionalPageContact">
          <h3>¿QUIERES TRABAJAR CON NUESTRO EQUIPO?</h3>
          <NavLink to={`/contacto`}>
            <button>CONTÁCTANOS</button>
          </NavLink>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default InstitucionalPage;
