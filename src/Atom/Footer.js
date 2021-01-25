import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Color from '../Assets/Color';

export default function Footer(){
	return(
		<Container>
			<div>
				<Link to="/PrivacyPolicy">プライバシーポリシー</Link>
				<Link to="/Contact">お問い合わせ</Link>
			</div>
			<p>© 2020 Reword</p>
		</Container>
	);	
}

const Container = styled.footer`
	width: 100%;
	background: ${Color.blue};
	margin: 0;
	margin-top: 30px;
	padding 40px 0;
	text-align: center;
	p{
		color: white;
		font-size: 12px;
	}
	a{
		display: inline;
		margin:0 20px;
		font-size: 12px;
		color: white;
		&:hover{
			text-decoration: underline;
		}
	}
`

