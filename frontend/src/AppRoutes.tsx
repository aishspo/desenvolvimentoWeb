// AppRoutes.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlteracaoUsuario from "./pages/AlteracaoUsuario.tsx";
import Cadastro from "./pages/Cadastro/index.tsx";
import ListaPastas from "./components/ListarPastas/index.tsx";
import Login from "./pages/Login/index.js";
import ListarAlunos from "./pages/ListarAlunos/index.tsx";
import StudentDashboard from "./pages/Aluno-dashboard/index.tsx";
import TeacherDashboard from "./pages/Professor-dashboard/index.tsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/alteracao" element={<AlteracaoUsuario />} />
        <Route path="/usuario/:email/pastas" element={<ListaPastas />} />

        {/* <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/usuario/:email/pastas" element={<ListaPastas />} />
        </Route>  */}

        <Route path="/" element={<Login />} />
        <Route path="/listarAlunos" element={<ListarAlunos />} />
        <Route path="/aluno-dashboard" element={<StudentDashboard />} />
        <Route path="/professor-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
