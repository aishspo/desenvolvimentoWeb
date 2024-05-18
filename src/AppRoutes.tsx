// AppRoutes.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AlteracaoUsuario from "./pages/AlteracaoUsuario.tsx";
import Cadastro from "./pages/Cadastro/index.tsx";
import ListaPastas from "./pages/ListarPastas/index.tsx";
import Login from "./pages/Login/index.tsx";
import Dashboard from "./pages/Dashboard/index.tsx";
import ListarAlunos from "./pages/ListarAlunos/index.tsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/alteracao" element={<AlteracaoUsuario />} />
        <Route path="/usuario/:email/pastas" element={<ListaPastas />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/listarAlunos" element={<ListarAlunos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
