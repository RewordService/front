/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Color from '../Assets/Color';

export const TextArea = styled.textarea`
  display: block;
  width: 90%;
  height: 100px;
  padding: 12px 16px;
  margin: 0 auto;
  border: 1px solid ${Color.blue};
  border-radius: 5px;
  font-size: 20px;
  &:focus {
    border: 1px solid ${Color.blue2};
  }
  @media screen and (max-width: 420px) {
    box-sizing: border-box;
  }
`;
