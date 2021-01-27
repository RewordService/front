import React from 'react';
import styled from 'styled-components';
import Color from '../Assets/Color';

const Flash = styled.h2`
  position: fixed;
  top: -60px;
  padding: 10px 30px;
  background: white;
  color: ${Color.blue};
  border: solid 1px #bababa;
  border-radius: 0 0 10px 10px;
  font-size: 16px;
  z-index: 3;
  transition: ease 0.2s;
`;

const FlashCard: React.FC = () => <Flash id="flash">更新しました</Flash>;

export default FlashCard;
