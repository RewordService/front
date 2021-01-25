import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import Color  from '../Assets/Color';

export default function AccountNav (){
		return(
			<Nav>
				<Link to='/ProfileEdit'><MenuBar><i className="far fa-address-card"/>プロフィール編集</MenuBar></Link>
				<Link to='/AccountEdit'><MenuBar><i className="fas fa-user-circle"/>アカウント編集</MenuBar></Link>
				<Link to='/AccountStatus'><MenuBar><i className="fas fa-award"/>会員グレード</MenuBar></Link>
			</Nav>
		);
}

const Nav= styled.div`
	border-top: solid 2px ${Color.background};
`

const MenuBar = styled.p`
	margin:0;
	padding: 10px;
	font-weight: 600;
	font-size: 14px;
	text-align: left;
	background: white;
	border-bottom: solid 2px ${Color.background};
	&:hover{
		transition: 0.1s;
		color: ${Color.blue};
	}
	i{
		text-align: center;
		display: inline-block;
  		width: 20px;
		padding-right: 40px;
	}
`

