/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import styled from 'styled-components';
// scripts
import { IsSignedIn } from '../Axios/UsersController';
// partials
import ProfileCard from '../Molecules/ProfileCard';
import AccountNav from '../Molecules/AccountNav';

export default function LeftBar() {
  if (IsSignedIn()) {
    return (
      <Container>
        <div className="content">
          <ProfileCard />
          <AccountNav />
        </div>
      </Container>
    );
  }
  return <></>;
}

const Container = styled.div`
  .content {
    background: white;
    margin: 0 10px;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
