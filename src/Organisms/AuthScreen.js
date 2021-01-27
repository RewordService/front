/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import styled from 'styled-components';
// partials
import AuthBtns from '../Molecules/AuthBtns';

export default function AuthScreen() {
  return (
    <Container>
      <div>
        <h3>会員登録を行うことで利用できます</h3>
        <AuthBtns />
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  margin: auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  > div {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 20%;
  }
`;
