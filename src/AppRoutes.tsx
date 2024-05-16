import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlteracaoUsuario from "./pages/AlteracaoUsuario.tsx";
import Cadastro from "./pages/Cadastro/index.tsx";
import ListaPastas from "./pages/ListarPastas/index.tsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />

        <Route path="/alteracao" element={<AlteracaoUsuario />} />

        <Route path="/usuario/:email/pastas" element={<ListaPastas />} />



      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
