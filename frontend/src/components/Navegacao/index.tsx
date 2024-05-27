/* eslint-disable no-unused-vars */
import { useState } from "react";
import styled from "styled-components";

const NavContainer = styled.div`
  height: 100vh;
  width: 16.25rem;
  left: 0;
  top: 0;
  background-color: rgb(186, 126, 149);
  display: flex;
  flex-direction: column;
`;

const TituloNavLink = styled.a`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 10px 15px;
  color: white;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: rgb(166, 89, 118);
  }
`;

const NavLink = styled.a`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 10px 15px;
  color: white;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: rgb(186, 126, 149);
  }
`;

const SubMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: rgb(186, 126, 149);
`;

const NavItem = styled.div`
  cursor: pointer;
`;

const FolderForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px;
  background-color: rgb(186, 126, 149);
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(186, 126, 149);
  }
`;

// Componente reutilizável para itens de navegação com submenu
const NavItemWithSubmenu = ({ title, submenus, showForm }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Função para alternar a abertura do submenu
  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para adicionar a nova pasta
  };

  // Função para definir o item ativo
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <NavItem onClick={toggleSubmenu}>
      <TituloNavLink as="div">{title}</TituloNavLink>
      <SubMenu isOpen={isOpen}>
        {/* Mapeia os submenus e cria os links */}
        {submenus.map((submenu, index) => (
          <NavLink
            key={index}
            href={submenu.link}
            active={activeItem === index}
            onClick={() => handleItemClick(index)}
          >
            {submenu.title}
          </NavLink>
        ))}

        {/* Renderiza o formulário se showForm for true */}
        {showForm && (
          <FolderForm onSubmit={handleFormSubmit}>
            <Input type="text" placeholder="Nome da Pasta" />
            <Button type="submit">Adicionar Pasta</Button>
          </FolderForm>
        )}
      </SubMenu>
    </NavItem>
  );
};

function Navbar() {
  const [abrirSubmenu, setAbrirSubmenu] = useState({});
  const [pastas, setPastas] = useState(["Pasta 1", "Pasta 2"]);
  const [nomePastaNova, setNomePastaNova] = useState("");

  const toggleSubmenu = (id) => {
    setAbrirSubmenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (e) => {
    setNomePastaNova(e.target.value);
  };

  const addFolder = (e) => {
    e.preventDefault();
    if (nomePastaNova.trim() !== "") {
      setPastas((prev) => [...prev, nomePastaNova.trim()]);
      setNomePastaNova("");
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <NavContainer>
      {/* Item de navegação "Meus Documentos" com formulário */}
      <NavItemWithSubmenu
        title="Meus Documentos"
        submenus={pastas.map((folder) => ({
          title: folder,
          link: `/${folder.replace(/\s+/g, "-").toLowerCase()}`,
        }))}
        showForm={true}
      />

      {/* Item de navegação "Planejamento" com submenus "Calendário" e "Eventos" */}
      <NavItemWithSubmenu
        title="Planejamento"
        submenus={[
          { title: "Calendário", link: "/calendario" },
          { title: "Eventos", link: "/eventos" },
        ]}
        showForm={false}
      />

      {/* Item de navegação "Compartilhamento" com submenus "Fórum" , "Teamchat" e "Grupos" */}
      <NavItemWithSubmenu
        title="Compartilhamento"
        submenus={[
          { title: "Fórum", link: "/forum" },
          { title: "Teamchat", link: "/teamchat" },
          { title: "Grupos", link: "/grupos" },
        ]}
        showForm={false}
      />

      {/* Item de navegação "Minhas salas" com submenus definidos de acordo com as salas do usuário */}
      <NavItemWithSubmenu
        title="Minhas salas"
        submenus={[
          { title: "Fórum", link: "/forum" },
          { title: "Teamchat", link: "/teamchat" },
          { title: "Grupos", link: "/grupos" },
        ]}
        showForm={false}
      />

      {/* Outros itens da navbar podem ser adicionados aqui */}
      <TituloNavLink href="#">Meu portfólio</TituloNavLink>
    </NavContainer>
  );
}

export default Navbar;