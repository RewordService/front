import React from 'react';
import styled from 'styled-components';
import Color from '../Assets/Color';
import ENV from '../env';

export default function SNSIcon (){
	return(
		<div>
			<a href={ENV.twitter} target="_blank" rel="noopener noreferrer">
				<Circle className="twitter">
					<i className="fab fa-twitter"/>
				</Circle>
			</a>
			<a href={ENV.facebook} target="_blank" rel="noopener noreferrer">
				<Circle className="facebook">
					<i className="fab fa-facebook-f"/>
				</Circle>
			</a>
		</div>
		
	);
}

const Circle = styled.div`
	position: fixed;
	
	height: 40px;
	width: 40px;

	color: white;
	background: #bababa;
	border-radius: 50%;

	text-align: center;

	transition: 0.2s ease;
	&.twitter{
		bottom: 80px;
		left: 10px;
		&:hover{
			background: ${Color.twitter};
		}
	}
	&.facebook{
		bottom: 30px;
		left: 10px;
		&:hover{
			background: ${Color.facebook};
		}
	}

	i{
		line-height: 40px;
		font-size: 20px;
	}
	@media screen and (max-width: 600px){
		display: none;
	}
`
