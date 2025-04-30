import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import "./main.scss";
import wppIcon from "/whatsapp.svg";

import App from "./App.jsx";
import ServiciosPage from "./pages/ServiciosPage.jsx";
import BolsaDeTrabajoPage from "./pages/BolsaDeTrabajoPage.jsx";
import CandidatosPage from "./pages/CandidatosPage.jsx";
import InstitucionalPage from "./pages/InstitucionalPage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import BolsaDeTrabajoItemPage from "./pages/BolsaDeTrabajoItemPage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import CandidatosPanel from "./components/CandidatosPanel.jsx";
import BolsaDeTrabajoPanel from "./components/BolsaDeTrabajoPanel.jsx";
import Postulantes from "./pages/Postulantes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/bolsa-de-trabajo" element={<BolsaDeTrabajoPage />} />
        <Route path="/bolsa-de-trabajo/:bolsaId" element={<BolsaDeTrabajoItemPage />} />
        <Route path="/candidatos" element={<CandidatosPage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/adminRRHHRecruitGroup" element={<AdminPanel />} />
        <Route path="/adminRRHHRecruitGroup/candidatos" element={<CandidatosPanel />} />
        <Route path="/adminRRHHRecruitGroup/bolsaDeTrabajo" element={<BolsaDeTrabajoPanel />} />
        <Route path="/adminRRHHRecruitGroup/bolsaDeTrabajo/:bolsaPostulantesId" element={<Postulantes />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
    <button className="wppIcon">
      <a href="https://wa.me/+5492617741234" target="_blank" rel="noopener noreferrer">
        <img src={wppIcon} alt="" />
      </a>
    </button>
  </StrictMode>
);
