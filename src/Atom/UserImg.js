import React from 'react';
import img from '../Assets/Img/defaultimg.png';


export default function UserImg(props){
	return <img src={process.env.REACT_APP_URL + props.url} height={props.height} width={props.width} alt="" onError={e=>e.target.src=img}/>
}

