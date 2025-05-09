import React, { useState } from "react";
import "../styles/serviciossection.scss";
import { NavLink } from "react-router";
import { FaBrain } from "react-icons/fa";

const ServiciosSection = () => {
  const [currentServicio, setCurrentServicio] = useState({});
  const [showModal, setShowModal] = useState(false);

  const servicios = [
    {
      nombre: "Selección de personal",
      descripcion:
        "Realizamos procesos de selección diseñados para identificar a los candidatos más adecuados para cada posición, alineando sus competencias técnicas, habilidades interpersonales y valores con las necesidades del puesto y de la organización. A través de entrevistas semidirigidas, e instrumentos especializados, aseguramos una elección que favorezca tanto a la empresa como al talento humano. Nuestro enfoque no solo se basa en el análisis del perfil profesional, sino también en garantizar una integración positiva al equipo, con el objetivo de contribuir al éxito organizacional y a la satisfacción de los empleados seleccionados. Este servicio incluye la toma de psicotécnico o psicodiagnóstico (según se requiera) del candidato en cuestión, para asegurar que el mismo se encuentre el un estado óptimo y que sus habilidades y competencias se alineen con la empresa y el puesto a cubrir.",
      image: "/servicios/selecciónDePersonal.jpg"
    },
    {
      nombre: "Psicotécnico",
      descripcion:
        "El proceso psicotécnico evalúa, a partir de técnicas psicológicas actualizadas y con respaldo científico, competencias personales, habilidades específicas y características de personalidad relevantes para el desempeño del puesto. Se aplican pruebas enfocadas en analizar aspectos como habilidades interpersonales, rasgos de personalidad, experiencia, trabajo en equipo y manejo del estrés. Además, se incluyen herramientas para evaluar competencias laborales clave, como atención al detalle, organización y capacidad de aprendizaje. Este proceso se complementa con una entrevista en profundidad para explorar antecedentes laborales, motivaciones y ajuste al rol. Su enfoque semi estructurado permite seleccionar candidatos idóneos basándose en características objetivas, optimizando la toma de decisiones en los procesos de selección.",
      image: "/servicios/Psicotécnico.jpg"
    },
    {
      nombre: "Diagnóstico organizacional",
      descripcion:
        "Analizamos la estructura, dinámicas, procesos internos y cultura organizacional de tu empresa para identificar fortalezas, áreas de mejora y oportunidades clave. Nuestro enfoque psicológico nos permite profundizar en aspectos relacionados con el clima laboral, los estilos de liderazgo y los flujos de comunicación. A través de entrevistas, encuestas diagnósticas y revisión de documentación, elaboramos un informe detallado con estrategias concretas que optimizan el desempeño de la organización. Este diagnóstico es fundamental para implementar cambios sostenibles, fomentar un entorno de trabajo positivo y tomar decisiones estratégicas que contribuyan al crecimiento empresarial.",
      image: "/servicios/diagnósticoOrganizacional.jpg"
    },
    {
      nombre: "Tercerización del área de rrhh",
      descripcion:
        "Nos encargamos de gestionar integralmente el área de RRHH de tu empresa, asegurando un enfoque profesional y estratégico en cada proceso. Iniciamos con un diagnóstico organizacional que incluye entrevistas con líderes y colaboradores, encuestas de clima laboral y análisis de procedimientos, para identificar áreas de mejora y necesidades específicas. Posteriormente, diseñamos e implementamos soluciones personalizadas que optimizan la gestión de talento, adaptándonos a la cultura de la empresa. Nuestro servicio incluye la implementación de estrategias de selección, capacitación, evaluación y desarrollo, garantizando resultados sostenibles que impulsen la productividad, independencia y bienestar organizacional. Este es un servicio orientado principalmente a empresas que no poseen un área de RRHH interno, o que en caso de poseerla, necesitan tercerizar algunos servicios.",
      image: "/servicios/tercerizaciónDeRrhh.jpg"
    },
    {
      nombre: "Armamos tu cv",
      descripcion:
        "A partir de nuestra amplia experiencia en selección, filtrado y confección, ayudamos a candidatos a destacar sus logros y competencias mediante la confección de currículos personalizados y estratégicos. Este servicio incluye asesoramiento especializado para identificar y resaltar los puntos más importantes del perfil profesional, adaptándolo a las demandas del mercado actual. Nuestro enfoque se centra en crear un CV claro, profesional y atractivo, que refleje tanto las habilidades técnicas como los aspectos humanos del candidato, maximizando sus oportunidades laborales. ¡La primer impresión importa mucho! un buen CV es el primer paso a tu trabajo soñado.",
      image: "/servicios/armadoDeCv.jpg"
    }
  ];

  return (
    <>
      <div className="servicioBanner">
        <h2 className="servicioBanner--h2">
          AGENCIA DE TRABAJO Y CONSULTORA DE RECURSOS HUMANOS ESPECIALIZADA EN SALUD MENTAL Y SELECCIÓN DE PERSONAL
        </h2>
        <h2>SERVICIOS</h2>
        <div className="servicioBanner--logos">
          <div
            onClick={() => {
              setCurrentServicio(servicios[0]);
              setShowModal(true);
            }}
          >
            <ion-icon name="person"></ion-icon>
            <p>SELECCIÓN DE PERSONAL</p>
          </div>
          <div
            onClick={() => {
              setCurrentServicio(servicios[1]);
              setShowModal(true);
            }}
          >
            <FaBrain />
            <p>PSICOTÉCNICO</p>
          </div>
          <div
            onClick={() => {
              setCurrentServicio(servicios[3]);
              setShowModal(true);
            }}
          >
            <ion-icon name="briefcase"></ion-icon>
            <p>RECURSOS HUMANOS TERCERIZADO</p>
          </div>
          <div
            onClick={() => {
              setCurrentServicio(servicios[2]);
              setShowModal(true);
            }}
          >
            <ion-icon name="receipt"></ion-icon>
            <p>DIAGNÓSTICO ORGANIZACIONAL</p>
          </div>
          <div
            onClick={() => {
              setCurrentServicio(servicios[4]);
              setShowModal(true);
            }}
          >
            <ion-icon name="document-text"></ion-icon>
            <p>ARMADO DE CV</p>
          </div>
        </div>
        <NavLink to="/servicios">
          <button className="w-1/2 md:1/10 text-center">¡VER MÁS INFORMACIÓN!</button>
        </NavLink>
      </div>

      {showModal && (
        <div className="servicioPageModalContainer">
          <div className="servicioPageModal">
            <h2>{currentServicio.nombre}</h2>
            <p>{currentServicio.descripcion}</p>
            <button
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => {
                setCurrentServicio({});
                setShowModal(false);
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiciosSection;
