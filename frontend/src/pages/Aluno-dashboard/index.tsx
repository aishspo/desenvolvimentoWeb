import React from "react";
import LogoutButton from "../../components/Logout";
import ListaPastas from "../../components/ListarPastas"
// import Navbar from "../../components/Navegacao";

const StudentDashboard: React.FC = () => {
  return (
    <>
    <ListaPastas />
      <LogoutButton />
    </>
  );
};

export default StudentDashboard;
