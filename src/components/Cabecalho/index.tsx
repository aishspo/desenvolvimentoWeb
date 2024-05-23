import styled from "styled-components";
import logo from "./assets/Logo.png";

// Estilização dos componentes

const CabecalhoEstilizado = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4em;
  background-color: #76012f;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 0.1;
`;

const LinkEstilizado = styled.a`
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;

  .material-symbols-outlined {
    color: white;
    font-size: 24px;
    margin-left: 10px;
    margin-right: 10px;
  }

  &:hover {
    color: #f0f0f0;

    .material-symbols-outlined {
      color: #f0f0f0;
    }
  }
`;

// Componente para links com ícones
interface IconLinkProps {
  href: string;
  icon: string;
}

const IconLink: React.FC<IconLinkProps> = ({ href, icon }) => (
  <LinkEstilizado href={href}>
    <span className="material-symbols-outlined">{icon}</span>
  </LinkEstilizado>
);

// Componente principal
function Cabecalho() {
  return (
    <CabecalhoEstilizado>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <img src={logo} alt="Logo de Sistema Acadêmico Geral Universitário" />
      <Container>
        <IconLink href="/" icon="notifications_active" />
        <IconLink href="/" icon="chat_bubble" />
        <IconLink href="/" icon="settings" />
      </Container>
    </CabecalhoEstilizado>
  );
}

export default Cabecalho;
