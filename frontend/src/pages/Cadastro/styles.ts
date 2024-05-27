import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

export const Formulario = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Rotulo = styled.label`
  font-size: 1em;
  margin-bottom: .25rem;
`;

export const CampoDigitacao = styled.div`
    display: flex;
    flex-direction: column;
`

export const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
