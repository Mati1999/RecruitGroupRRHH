import React, { useState } from "react";
import "../styles/serviciospage.scss";
import Header from "../components/Header";
import ServiciosBanner from "/servicios/ServiciosBanner.png";
import ServiciosCards from "../components/ServiciosCards";
import Footer from "../components/Footer";
import { NavLink } from "react-router";

const ServiciosPage = () => {
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
      nombre: "Psicodiagnóstico",
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit fermentum curabitur vestibulum elementum, tempor bibendum cum quisque aliquet auctor hendrerit morbi eu cras fusce, phasellus malesuada scelerisque curae habitant consequat montes nascetur eget dapibus. Lacinia montes mauris praesent nec varius odio in proin ornare mattis himenaeos aenean, inceptos metus porttitor facilisis sociis sagittis euismod vel quam risus.",
      image: "/servicios/PsicodiagnósticoCuadrado.jpg"
    },
    {
      nombre: "Diasnóstico organizacional",
      descripcion:
        "Analizamos la estructura, dinámicas, procesos internos y cultura organizacional de tu empresa para identificar fortalezas, áreas de mejora y oportunidades clave. Nuestro enfoque psicológico nos permite profundizar en aspectos relacionados con el clima laboral, los estilos de liderazgo y los flujos de comunicación. A través de entrevistas, encuestas diagnósticas y revisión de documentación, elaboramos un informe detallado con estrategias concretas que optimizan el desempeño de la organización. Este diagnóstico es fundamental para implementar cambios sostenibles, fomentar un entorno de trabajo positivo y tomar decisiones estratégicas que contribuyan al crecimiento empresarial.",
      image: "/servicios/diagnósticoOrganizacional.jpg"
    },
    {
      nombre: "Asesoramiento legal",
      descripcion:
        "Ofrecemos un servicio integral de asesoramiento legal laboral, orientado a garantizar el cumplimiento de la normativa vigente y a proteger los derechos  de tu empresa. Con el apoyo de nuestros socios legales, nos enfocamos en , redactar contratos, resolver dudas legales, representar legalmente ante organismos oficiales, y brindar apoyo en la gestión de casos complejos. Este servicio busca generar un entorno de trabajo seguro, respetando las obligaciones legales y fortaleciendo las relaciones laborales. Trabajamos en conjunto con tu equipo para establecer políticas organizacionales claras y evitar problemas futuros, buscando la mayor protección para tu organización. Dicho servicio es llevado  cabo por el Estudio Jurídico Sanchez, Díaz Telli, Echevarría &  Asociados.",
      image: "/servicios/asesoramientoLegal.jpg"
    },
    {
      nombre: "Tercerización del área de rrhh",
      descripcion:
        "Nos encargamos de gestionar integralmente el área de RRHH de tu empresa, asegurando un enfoque profesional y estratégico en cada proceso. Iniciamos con un diagnóstico organizacional que incluye entrevistas con líderes y colaboradores, encuestas de clima laboral y análisis de procedimientos, para identificar áreas de mejora y necesidades específicas. Posteriormente, diseñamos e implementamos soluciones personalizadas que optimizan la gestión de talento, adaptándonos a la cultura de la empresa. Nuestro servicio incluye la implementación de estrategias de selección, capacitación, evaluación y desarrollo, garantizando resultados sostenibles que impulsen la productividad, independencia y bienestar organizacional. Este es un servicio orientado principalmente a empresas que no poseen un área de RRHH interno, o que en caso de poseerla, necesitan tercerizar algunos servicios.",
      image: "/servicios/tercerizaciónDeRrhh.jpg"
    },
    {
      nombre: "Evaluación de calidad de servicio",
      descripcion:
        "Medimos la calidad del servicio ofrecido por tu empresa a través de la metodología de 'Mystery Shopper', donde evaluadores se hacen pasar por clientes para analizar sus experiencias. Este servicio permite identificar aciertos y áreas de mejora en la atención, brindando una perspectiva real del servicio desde el punto de vista del cliente. A partir de estos resultados, elaboramos recomendaciones personalizadas que ayudan a optimizar la experiencia del cliente, potenciar la satisfacción y mejorar los equipos de venta o atención al público. Es una herramienta clave para las empresas que buscan destacarse frente a la competencia.",
      image: "/servicios/evaluaciónDeCalidad.jpg"
    },
    {
      nombre: "Capacitaciones",
      descripcion:
        "Diseñamos programas de capacitación personalizados para fortalecer las competencias de tus equipos y promover el desarrollo profesional continuo. Nuestros entrenamientos están orientados a áreas como trabajo en equipo, liderazgo, comunicación efectiva, inteligencia emocional, programa de inducción, bienestar institucional, entre otros. Los programas son dinámicos, interactivos y ajustados a las necesidades específicas de la empresa, logrando un impacto positivo en el desempeño laboral. Además, nuestras capacitaciones promueven el bienestar organizacional al fomentar la motivación, la productividad y un clima laboral saludable, contribuyendo al crecimiento integral de la organización y sus colaboradores. Buscamos brindar a los empleados el mejor bagaje de herramientas posibles, para que el día de mañana puedan contar con ellas al tener que tomar decisiones y resolver conflictos.",
      image: "/servicios/capacitaciones.jpg"
    },
    {
      nombre: "Armado de avisos",
      descripcion:
        "Creamos publicaciones estratégicas y atractivas para la búsqueda de talentos, garantizando que reflejen la esencia de la empresa y las características del puesto. Nos encargamos de redactar el contenido de los avisos con un enfoque claro y profesional, optimizando su alcance en las plataformas adecuadas para captar los mejores candidatos. Esto potencia la imagen corporativa en el mercado laboral, y también aumenta las probabilidades de encontrar al talento ideal, generando procesos de selección eficientes y resultados exitosos.",
      image: "/servicios/armadoDeAvisos.jpg"
    },
    {
      nombre: "Armamos tu cv",
      descripcion:
        "A partir de nuestra amplia experiencia en selección, filtrado y confección, ayudamos a candidatos a destacar sus logros y competencias mediante la confección de currículos personalizados y estratégicos. Este servicio incluye asesoramiento especializado para identificar y resaltar los puntos más importantes del perfil profesional, adaptándolo a las demandas del mercado actual. Nuestro enfoque se centra en crear un CV claro, profesional y atractivo, que refleje tanto las habilidades técnicas como los aspectos humanos del candidato, maximizando sus oportunidades laborales. ¡La primer impresión importa mucho! un buen CV es el primer paso a tu trabajo soñado.",
      image: "/servicios/armadoDeCv.jpg"
    },
    {
      nombre: "Asesoramiento personal",
      descripcion:
        "Brindamos un servicio de apoyo y orientación personalizada para personas que buscan mejorar su desarrollo profesional y bienestar emocional. Este asesoramiento incluye herramientas para gestionar cambios laborales, manejar conflictos, potenciar habilidades personales y planificar su carrera. ¿No conseguís empleo? Te ayudamos a encontrar tus puntos fuertes y áreas de mejora para que esta búsqueda sea más eficiente. Nuestro enfoque integral y humanista se basa en la escucha activa y en brindar soluciones prácticas para alcanzar metas y objetivos individuales. ",
      image: "/servicios/asesoramientoPersonal.jpg"
    },
    {
      nombre: "Selección it",
      descripcion:
        "Nos especializamos en identificar y atraer talento altamente calificado en tecnologías de la información, un sector clave en la transformación digital de las empresas. A través de procesos de selección innovadores, evaluamos conocimientos técnicos, adaptabilidad, salud mental y experiencia en roles complejos. Nuestros psicólogos trabajan junto con expertos en tecnología para garantizar que cada candidato no solo cumpla con los requisitos técnicos, sino que también se integre exitosamente en el equipo y cultura de la empresa. Este servicio asegura la contratación de perfiles estratégicos y capaces, indispensables para el desarrollo de proyectos tecnológicos. A través del HeadHunting y habilidades de reclutamiento, nos encargamos de conseguir los mejores perfiles de posiciones como desarrolladores, arquitectos, PM, etc.",
      image: "/servicios/selecciónIt.jpg"
    },
    {
      nombre: "Selección DAI y AT.",
      descripcion:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit fermentum curabitur vestibulum elementum, tempor bibendum cum quisque aliquet auctor hendrerit morbi eu cras fusce, phasellus malesuada scelerisque curae habitant consequat montes nascetur eget dapibus. Lacinia montes mauris praesent nec varius odio in proin ornare mattis himenaeos aenean, inceptos metus porttitor facilisis sociis sagittis euismod vel quam risus.",
      image: "/servicios/ATyDAI.jpg"
    }
  ];

  return (
    <>
      <Header />
      <div className="servicioPageBanner">
        <img src={ServiciosBanner} alt="" />
      </div>

      <main className="servicioPageMain">
        {servicios.map((servicio, index) => (
          <ServiciosCards
            key={index}
            nombre={servicio.nombre}
            descripcion={servicio.descripcion}
            imgRoute={servicio.image}
            setCurrentServicio={() => setCurrentServicio(servicio)}
            setShowModal={() => setShowModal(true)}
          />
        ))}
      </main>

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

      <div className="servicioPageContact">
        <h4>¿NECESITAS MÁS INFORMACIÓN?</h4>
        <NavLink to={`/contacto`}>
          <button>CONTÁCTANOS</button>
        </NavLink>
      </div>
      <Footer />
    </>
  );
};

export default ServiciosPage;
