import React from 'react';
import { Link } from 'react-router-dom';
import { AuthDelete } from '../Axios/AuthController';

export default function NavLink(props) {
  if (props.text === 'Logout') {
    return (
      <div href="" onClick={AuthDelete}>
        {props.text}
      </div>
    );
  }
  return <Link to={`/${props.text}`}>{props.text}</Link>;
}
