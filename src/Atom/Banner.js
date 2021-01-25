import React from 'react';
import styled from 'styled-components';
import Color from '../Assets/Color';
import ENV from '../env';
import {withRouter} from 'react-router-dom';

const Banner = styled.div`
	display: inline-block;
	width: 30%;
	margin:0 10px;
	margin-top: 10px;
	padding: 10px 0;
	text-align: center;
	border-radius: 3px;
	cursor: pointer;
	font-family: "Fontawesome";
	i{
		padding: 0 10px;
	}
	&::before{
		color: white;
		font-size: 18px;
		font-weight: bold;
	}
	@media screen and (max-width: 510px){
		display: block;
		width: 80%;
		margin: auto;
		margin-top: 10px;
	}
`


export const TwitterBanner = styled(Banner)`
	background: ${Color.twitter};	
	&:hover{
		transition: ease 0.1s;
		background: ${Color.twitterHover};
	}
	&::before{
		content: '\f099    Twitter';
		
	}

`
export const FacebookBanner = styled(Banner)`
	background: ${Color.facebook};
	&:hover{
		transition: ease 0.1s;
		background: ${Color.facebookHover};
	}
	&:before{
		content: '\f39e    Facebook';
	}


`
export const GameBanner = styled(Banner)`
	background: ${Color.blue};
	&:hover{
		transition: ease 0.1s;
		background: ${Color.blue2};
	}
	&:before{
		content: '\f11b    PlayGame';
	}

`

function Banners(props){
	function Click(url){
		window.open(url)
	}
	return(
		<div style={{textAlign: "center"}}>
			<TwitterBanner onClick={()=>Click(ENV.twitter)}/>
			<FacebookBanner onClick={()=>Click(ENV.facebook)}/>
			<GameBanner onClick={()=>props.history.push('/Game')}/>
		</div>
	);
}

export default withRouter(Banners)

