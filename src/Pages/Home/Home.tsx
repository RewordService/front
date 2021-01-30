import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ShareButtons from '../../components/ShareButtons';
import img from '../../Assets/Img/home.jpg';
import NewUsers from './NewUsers';
import TotalUsers from './ScoreUsers';
import SlideBar from '../../Organisms/SlideBar';
import News from './News';
import RewordInfo from './RewordInfo';

const Home: React.FC = () => (
  <>
    <Img>
      <p>Rewordを継続して能力開発を行う。</p>
    </Img>
    <SlideBar />
    <Container maxWidth="md">
      <RewordInfo />
      <ShareButtons />
      <News />
      <NewUsers />
      <Box mb={5}>
        <TotalUsers />
      </Box>
    </Container>
  </>
);

const Img = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  margin: -30px 0 0 0;
  text-align: center;
  background-image: url(${img});
  background-size: cover;
  background-position: center;
  &::before {
    content: 'ワーキングメモリを鍛えよう!';
    position: relative;
    z-index: 1;
    padding: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.3);
    line-height: 400px;
    text-align: center;
    font-weight: 900;
    font-size: 30px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  p {
    color: white;
    position: absolute;
    top: 60%;
    left: 50%;
    z-index: 1;

    margin: auto;
    font-weight: 600;
    letter-spacing: 13px;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
  }
  @media screen and (max-width: 500px) {
    height: 300px;
    &::before {
      line-height: 300px;
      font-size: 25px;
    }
    p {
      display: none;
    }
  }
`;
export default Home;
