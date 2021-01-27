/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import Observer from '@researchgate/react-intersection-observer';
// scripts
import { PostsIndex } from '../Axios/PostsController';
// partials
import PostList from '../Molecules/PostList';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [index, setIndex] = useState('empty');

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WS);
    const data = {
      command: 'subscribe',
      identifier: JSON.stringify({ channel: 'RoomChannel' }),
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(data));
    };
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (
        msg.type === 'ping' ||
        msg.type === 'confirm_subscription' ||
        msg.type === 'welcome'
      ) {
      } else {
        setNewPosts((newPosts) => [...newPosts, ...[JSON.parse(msg.message)]]);
        setIndex((index) => index + 1);
      }
    };
  }, []);
  // did mount & did mount
  useEffect(() => {
    PostsIndex(index).then((res) => {
      setPosts((posts) => [...posts, ...res]);
      setIndex(res[res.length - 1].id - 1);
      console.log('データはないよ');
    });
  }, [scroll]);

  return (
    <>
      {newPosts.map((post) => (
        <PostList
          key={post.id - scroll}
          id={post.id}
          userId={post.user_id}
          name={post.user.name}
          body={post.body}
          created={post.created_date}
          url={post.user.image.url}
        />
      ))}
      {posts.map((post) => (
        <PostList
          key={post.id}
          id={post.id}
          userId={post.user_id}
          name={post.user.name}
          body={post.body}
          created={post.created_date}
          url={post.user.image.url}
        />
      ))}
      <Observer
        onChange={(e) => {
          if (e.isIntersecting) setScroll(scroll + 1);
        }}
      >
        <div />
      </Observer>
    </>
  );
}
