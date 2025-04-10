import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import "./main.scss";

import App from "./App.jsx";
import ServiciosPage from "./pages/ServiciosPage.jsx";
import BolsaDeTrabajoPage from "./pages/BolsaDeTrabajoPage.jsx";
import CandidatosPage from "./pages/CandidatosPage.jsx";
import InstitucionalPage from "./pages/InstitucionalPage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import BolsaDeTrabajoItemPage from "./pages/BolsaDeTrabajoItemPage.jsx";

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
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
