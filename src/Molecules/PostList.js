/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Color from '../Assets/Color';
// scripts
import { PostDelete } from '../Axios/PostsController';
import { CurrentUser } from '../Axios/UsersController';
// partials
import { Content } from '../Atom/Content';
import { FlexJustify } from '../Atom/FlexJustify';
import UserImg from '../Atom/UserImg';

export default function PostList(props) {
  const [remove, setRemove] = useState(false);
  if (!remove) {
    return (
      <Container id={props.id}>
        <FlexJustify style={{ justifyContent: 'start', alignItems: 'center' }}>
          <Link to={`/Account/${props.userId}`}>
            <UserImg url={props.url} height="60" width="60" />
          </Link>

          <div style={{ marginLeft: '5%' }}>
            <h2>
              <Link to={`/Account/${props.userId}`}>{props.name}</Link>
            </h2>
            <p>{props.body}</p>
          </div>
        </FlexJustify>
        <p>
          {CurrentUser() === props.userId && (
            <span
              onClick={() => {
                setRemove(true);
                PostDelete(props.id);
              }}
            >
              &#xf2ed; 削除
            </span>
          )}
          <time>{props.created}</time>
        </p>
      </Container>
    );
  }
  return <></>;
}

const Container = styled(Content)`
  padding-left: 10px;
  width: 790px;
  animation: fade 1s ease-out 0s forwards;
  border-left: solid 10px ${Color.blue};
  > p {
    margin: auto 0px;
    padding: 0;
    text-align: right;
    color: #bababa;
    font-size: 12px;
  }
  h2 {
    font-size: 17px;
  }
  span {
    font-family: Fontawesome;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  time {
    padding-left: 10px;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
