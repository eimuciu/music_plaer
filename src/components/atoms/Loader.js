import React from 'react';
import styled from 'styled-components';

const Loader = () => <Div />;

const Div = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
  z-index: 1;
  width: 50px;
  height: 50px;
  margin: -75px 0 0 -75px;
  border: 8px solid black;
  border-radius: 50%;
  border-top: 8px solid yellow;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
