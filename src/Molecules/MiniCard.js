import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import UserImg from '../Atom/UserImg';
function MiniCard (props){
	function onClick(){
		props.history.push({
			pathname: 'Account/'+props.id,
		});
	};
	return(
		<Container onClick={onClick}>
			<UserImg url={props.url} height="60" width="60"/>
			<p style={{margin: '0'}}>{props.name}</p>
		</Container>
	);
}
const Container = styled.div`
	position: relative;
	bottom: 0px;
	box-sizing: content-box;
	text-align: center;
	margin: 20px 10px;
	padding: 10px;
	background: white;
	filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.3));
	transition: 0.3s ease;
	cursor: pointer;
	&:hover{
		bottom: 5px;
		filter: drop-shadow(0px 0px 5px rgba(0,0,0,0.1));
	}

	img{
		border-radius: 50%;
	}
	p{
		width 65px;
		font-weight: 500;
		white-space: nowrap;  
 		overflow: hidden;  
		text-overflow: ellipsis;   
	}
	&:last-child{
		&::before{
			content: '';
			position: absolute;
			top: 0;
			left: 100%;
			width: 10px; 
			height: 1px; 
		}
	}

`

export default withRouter(MiniCard)
