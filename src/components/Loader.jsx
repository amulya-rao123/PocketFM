import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(1); opacity: 0.7; }
  40% { transform: scale(1.3); opacity: 1; }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  gap: 0.7rem;
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, #e0c3fc 0%, #8e44ad 100%);
  animation: ${bounce} 1.4s infinite both;
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

function Loader() {
  return (
    <LoaderWrapper>
      <Dot />
      <Dot />
      <Dot />
    </LoaderWrapper>
  );
}

export default Loader;
