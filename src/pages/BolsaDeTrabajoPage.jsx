import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import bolsaDeTrabajoBanner from "/bolsaDeTrabajo/bolsaDeTrabajoBanner.png";
import "../styles/bolsadetrabajopage.scss";
import { useResource } from "../recursos";
import { NavLink } from "react-router";
import Footer from "../components/Footer";

const BolsaDeTrabajoPage = () => {
  const estadoBolsaActualizado = useRef(false);
  const getBolsa = useResource((resource) => resource.getBolsa);
  const bolsa = useResource((resource) => resource.bolsa);

  useEffect(() => {
    if (!estadoBolsaActualizado.current) {
      getBolsa();
      estadoBolsaActualizado.current = true;
    }
  }, [getBolsa, bolsa]);

  return (
    <>
      <Header />
      <div className="bolsaDeTrabajoPageBanner">
        <img src={bolsaDeTrabajoBanner} alt="" />
      </div>
      <div className="bolsaDeTrabajoPageTrabajos">
        {bolsa.length != 0
          ? bolsa.map(
              (item, i) =>
                item.closed === "open" && (
                  <>
                    <div key={i} className="bolsaDeTrabajoPageItem">
                      <h2>{item.nombre}</h2>
                      <p>{item.ubicacion}</p>
                      <NavLink to={`/bolsa-de-trabajo/${item.id}`}>Ver más</NavLink>
                    </div>

                    <div key={i} className="bolsaDeTrabajoPageItemMobile py-5">
                      <details className="group w-full flex flex-col justify-around">
                        <summary className="mb-1 flex justify-between items-center font-medium cursor-pointer list-none">
                          <span>{item.nombre}</span>
                          <span className="transition group-open:rotate-180">
                            <svg
                              fill="none"
                              height="24"
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </summary>
                        <p className="text-neutral-600 mt-[1rem] group-open:animate-fadeIn">{item.ubicacion}</p>
                        <NavLink
                          className="text-neutral-600 mb-2 group-open:animate-fadeIn"
                          to={`/bolsa-de-trabajo/${item.id}`}
                        >
                          Ver más
                        </NavLink>
                      </details>
                    </div>
                  </>
                )
            )
          : "No hay nada"}
      </div>
      <Footer />
    </>
  );
};

export default BolsaDeTrabajoPage;
