import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/testimonios.scss";
import INKA from "/logos/INKA.jpg";
import elNido from "/logos/elNido.jpg";
import rocasDelPlata from "/logos/rocasDelPlata.jpg";
import emergencias from "/logos/emergencias.jpg";
import passardi from "/logos/passardi.jpg";
import dipolo from "/logos/dipolo.jpg";
import fliRubino from "/logos/fliRubino.jpg";
import arquimetal from "/logos/arquimetal.jpg";
import acacia from "/logos/acacia.jpg";
import bagual from "/logos/bagual.jpg";
import leon2 from "/logos/leon2.jpg";
import mendozapost from "/logos/mendozapost.jpg";
import msr from "/logos/msr.jpg";
import trebol from "/logos/trebol.jpg";

const testimonios = [
  {
    id: 1,
    empresa: "INKA EXPEDICIONES",
    testimonio:
      "La labor de la consultora Recruit Group fue un gran desafío, en la búsqueda y selección de personal para Inka Expediciones y Aconcagua Expediciones y nos sentimos muy acompañados en el proceso, con un gran profesionalismo de parte de todo el equipo, que junto a Daniel, Romina y Agustina nos brindaron una solución a nuestras necesidades de recursos humanos. Muy recomendable para futuras acciones.",
    img: INKA
  },
  {
    id: 2,
    empresa: "EL NIDO DOMOS",
    testimonio:
      "Excelente experiencia con Recruit. Gran seriedad y profesionalismo, lo que nos dió confianza en su capacidad para gestionar el proceso de selección. Entendieron nuestras necesidades y nos presentaron candidatos altamente calificados en muy poco tiempo. Gracias a su rapidez y dedicación, pudimos cubrir nuestras vacantes clave de manera efectiva. Sin duda, recomendaría sus servicios a cualquier empresa que busque un reclutamiento ágil y profesional.",
    img: elNido
  },
  {
    id: 3,
    empresa: "ROCAS DEL PLATA",
    testimonio:
      "Gracias por sus servicios! Ha sido de mucha utilidad para nosotras su trabajo. Amables, expeditivas, eficientes.",
    img: rocasDelPlata
  },
  {
    id: 4,
    empresa: "EMERGENCIAS SALUD",
    testimonio:
      "Trabajar con RECRUIT GROUP es dar con la fuente de soluciones en las necesidades y búsqueda de  personal.  Impecables por su trato, profesionalismo y modo de trabajar. Profesionales que cuentan con amplio conocimiento en reclutamiento y detección de perfiles acordes a las necesidades de cada puesto. Se destacan no solo en el asesoramiento previo, sino también en el acompañamiento del desarrollo del postulante. Desde Emergencias Mendoza, vaya nuestro agradecimiento y felicitaciones.",
    img: emergencias
  },
  {
    id: 5,
    empresa: "Passardi",
    testimonio:
      "Quería agradecer por el excelente servicio que brindaron a nuestra empresa. Cabe destacar la amabilidad, buena predisposición y el asesoramiento de parte de RECRUIT, tanto antes como después de haber recibido el informe. Muchas gracias... Un placer haber recibido sus servicios.",
    img: passardi
  },
  {
    id: 6,
    empresa: "Dipolo",
    testimonio:
      "Quiero destacar el profesionalismo, dedicación y buena comunicación que mantuvieron durante el proceso de búsqueda y aún más importante, el seguimiento posterior, que me hizo sentir acompañada durante la inserción laboral.",
    img: dipolo
  },
  {
    id: 7,
    empresa: "Bodega Rubino",
    testimonio:
      "Participamos de varias selecciones de personal, siempre han tenido un trato cordial y una actitud expeditiva para conseguirnos los CV, tienen muy buenos filtros a pasar, entonces no es muy dificil elegir entre los distintos candidatos, siempre tienen respuestas rápidas, y esta buenísimo que nos iban haciendo un seguimiento constante. Con los servicios que nos brindan ahora de psicodiagnóstico también estamos contentos. Esperamos seguir trabajando juntos.",
    img: fliRubino
  },
  {
    id: 8,
    empresa: "Arquimetal",
    testimonio:
      "Desde el primer contacto, pude notar el alto nivel de profesionalismo y compromiso en la atención, que se destacó especialmente por contar con un equipo de psicólogos, el cual genera un valor agregado muy importante. A diferencia de otras experiencias con empresas de RRHH, se adaptaron a nuestras demandan buscando la mejor calidad posible de los candidatos seleccionados. Cabe destacar el compromiso con los tiempos requeridos.",
    img: arquimetal
  },
  {
    id: 9,
    empresa: "ACACIASEC",
    testimonio:
      "Tuve una excelente experiencia con Recruit Group. Destaco su capacidad para entender rápidamente nuestras necesidades, la calidad de los candidatos presentados y el acompañamiento durante todo el proceso. Además, el servicio de evaluaciones y el seguimiento posterior a la contratación aportan un gran valor. Recomiendo su trabajo y profesionalismo.",
    img: acacia
  },
  {
    id: 10,
    empresa: "Bodega Bagual",
    testimonio:
      "El trabajar con Recruit es dejar procesos en manos profesionales. Con la bodega realizó un trabajo excepcional, una búsqueda masiva con mucho esfuerzo de fondo que cumplió nuestras expectativas. Se dedicaron tanto a la búsqueda de puestos operativos especializados, encargados y líderes para configurar el equipo completo de la temporada de cosecha. Sin duda, una elección acertada.",
    img: bagual
  },
  {
    id: 11,
    empresa: "Estudio contable Leon",
    testimonio:
      "Nos presentaron perfiles excelentes y transparentes, logrando una incorporación exitosa para nuestra área contable. Como asesores contables en aspectos laborales, valoramos mucho este servicio previo y consideramos que es elemental para una pyme en la actualidad.",
    img: leon2
  },
  {
    id: 12,
    empresa: "Mendoza Post",
    testimonio:
      "Todo el equipo de Recruit Group Consultora demostró profesionalismo desde el minuto cero, entendiendo la necesidad del puesto a cubrir y los tiempos de la empresa. Valoramos mucho la excelente comunicación durante todo el proceso.",
    img: mendozapost
  },
  {
    id: 13,
    empresa: "MEDICAL STAFF RELIEF",
    testimonio:
      "Tuve una muy buena experiencia con Recruit Group, especialmente con Agustina y Romina. Destaco su enfoque personalizado, el acompañamiento constante durante todo el proceso y la calidad de los perfiles presentados. Se nota el trabajo de búsqueda y evaluación detrás de cada candidato, logrando una selección alineada con nuestras necesidades.",
    img: msr
  },
  {
    id: 14,
    empresa: "TRÉBOL CENTRO DE DÍA",
    testimonio:
      "La experiencia con las chicas fue excelente, realmente respondieron en tiempo y forma a nuestras necesidades e inquietudes. El servicio prestado fue muy bueno, nos sirvió mucho para orientarnos y tomar decisiones acertadas, muchas gracias por su profesionalismo.",
    img: trebol
  }
];

const Testimonios = () => {
  return (
    <div className="testimonios relative w-full max-w-7xl mx-auto py-10">
      <h2 className="text-center mb-4 text-2xl font-bold">TESTIMONIOS</h2>

      <Swiper
        pagination={{
          clickable: true
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        loop={true}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        className="mySwiper customSwiper w-full h-full"
      >
        {testimonios.map((testimonio) => (
          <SwiperSlide key={testimonio.id}>
            {({ isActive }) => (
              <div
                className={`testimoniosDiv transition-all duration-500 ease-in-out transform w-full h-full flex flex-col justify-center items-center text-center gap-5 ${
                  isActive ? "scale-100 opacity-100 z-20" : "scale-90 opacity-60 z-10"
                } bg-white rounded-xl shadow-md`}
              >
                <img src={testimonio.img} alt={testimonio.empresa} className="mx-auto mb-2 w-20" />
                <h3 className="font-bold text-lg">{testimonio.empresa}</h3>
                <p className="text-md overflow">{testimonio.testimonio}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        pagination={{
          clickable: true
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        className="mySwiper customSwiperMobile w-full h-full"
      >
        {testimonios.map((testimonio) => (
          <SwiperSlide key={testimonio.id}>
            {({ isActive }) => (
              <div
                className={`testimoniosDiv transition-all duration-500 ease-in-out transform w-full h-full flex flex-col justify-center items-center text-center gap-5 ${
                  isActive ? "scale-100 opacity-100 z-20" : "scale-90 opacity-60 z-10"
                } bg-white rounded-xl shadow-md`}
              >
                <img src={testimonio.img} alt={testimonio.empresa} className="mx-auto mb-2 w-20" />
                <h3 className="font-bold text-lg">{testimonio.empresa}</h3>
                <p className="text-md ">{testimonio.testimonio}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev text-4xl font-bold left-0 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer" />
      <div className="swiper-button-next text-4xl font-bold right-0 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer" />
    </div>
  );
};

export default Testimonios;
