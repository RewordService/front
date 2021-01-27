/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import img from '../Assets/Img/defaultimg.png';

export default function UserImg(props) {
  return (
    <img
      src={process.env.REACT_APP_URL + props.url}
      height={props.height}
      width={props.width}
      alt=""
      onError={(e) => (e.target.src = img)}
    />
  );
}
