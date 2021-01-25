import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
//partials
import {SignInBtn, SignUpBtn} from '../Atom/Button';


export default function AuthBtns (){
	return(
		<Container>
			<Link to='/SignUp'><SignUpBtn className="btn">会員登録</SignUpBtn></Link>
			<Link to='/SignIn'><SignInBtn className="btn">ログイン</SignInBtn></Link>
		</Container>
	);
}
const Container = styled.div`
@media screen and (max-width:1000px){
	.btn{
		display: block;
	}
}
	
`
