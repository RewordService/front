import styled from 'styled-components';

const Content = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 10px;
  background: white;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
  pre {
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  &:not(:first-child) {
    margin-top: 10px;
  }
  @media screen and (max-width: 800px) {
    width: 600px;
  }
  @media screen and (max-width: 500px) {
    width: 350px;
  }
`;

export default Content;
