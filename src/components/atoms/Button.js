import styled from 'styled-components';

function Button({ onClick, children }) {
  return <Btn onClick={onClick}>{children}</Btn>;
}

const Btn = styled.button`
  padding: 5px 10px;
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
`;

export default Button;
