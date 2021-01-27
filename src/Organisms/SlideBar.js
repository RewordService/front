/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../Assets/Color';
import ads from '../Assets/ad.js';

export default function SlideBar() {
  const max = ads.ads.length;
  const i = Math.floor(Math.random() * max);
  const [title, setTitle] = useState(ads.ads[i].title);
  const [url, setURL] = useState('');
  useEffect(() => {
    document.onanimationiteration = () => {
      const max = ads.ads.length;
      const i = Math.floor(Math.random() * max);
      setTitle(ads.ads[i].title);
      setURL(ads.ads[i].url);
    };

    return () => {};
  }, []);

  return (
    <Container>
      <div className="left" />
      <a id="slide" href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <div className="right" />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 50px;
  width: 100%;
  background: #525252;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  div {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 3%;
    padding: 0 10px;
    background: #666666;
    color: #b2b2b2;
    font-size: 30px;
    line-height: 50px;
    &.right {
      right: 0;
    }
    &.left {
      left: 0;
    }
  }
  a {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 32px;
    color: ${Color.background};
    font-weight: 800;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 5px;
    animation-name: slide-auto;
    animation-duration: 8s;
    animation-direction: normal;
    animation-play-function: linear;
    animation-play-state: running;
    animation-iteration-count: infinite;
    &.left {
      animation-duration: 3s;
    }
    &:hover {
      color: ${Color.blue};
      text-decoration: underline;
    }
    @media screen and (max-width: 500px) {
      letter-spacing: 0px;
    }
  }
  @keyframes slide-auto {
    0% {
      right: -100%;
    }
    5% {
      right: 0;
    }
    90% {
      right: 0;
    }
    95% {
      right: 100%;
    }
    100% {
      right: 100%;
    }
  }
`;
