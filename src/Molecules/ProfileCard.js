/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import LoadAnime from '../Assets/loading.json';
// scripts
import { UserInfo, CurrentUser, IsSignedIn } from '../Axios/UsersController';
import { AuthDelete } from '../Axios/AuthAction';
import UserImg from '../Atom/UserImg';

export default function ProfileCard() {
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (IsSignedIn) {
      UserInfo(CurrentUser())
        .then((res) => {
          setImg(res.image.url);
          setName(res.name);
          setIsLoading(true);
        })
        .catch((res) => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          AuthDelete();
        });
    }
  }, []);

  const defaultOption = {
    loop: true,
    autoplay: true,
    animationData: LoadAnime,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Content>
      {isLoading ? (
        <UserImg url={img} height="100" width="100" />
      ) : (
        <Lottie
          options={defaultOption}
          height={100}
          width={100}
          style={{ margin: '40px' }}
        />
      )}
      <h2>{name}</h2>
    </Content>
  );
}

const Content = styled.div`
  text-align: center;
  min-width: 250px;
  img {
    border-radius: 50%;
    margin: 20px auto;
    margin-bottom: 0px;
  }
  p {
    border-top: solid 2px #bab;
    text-align: left;
    word-wrap: break-word;
  }
`;
