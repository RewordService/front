import React, { useState,useEffect }  from 'react';
import {Link,withRouter} from 'react-router-dom';
import styled from 'styled-components';
import Color from '../Assets/Color';
//scripts
import {AuthDelete} from '../Axios/AuthAction';
import {IsSignedIn,CurrentUser} from '../Axios/UsersController'; 

function RightBar(props){
	const [flag, setFlag] = useState(props.flag)
	useEffect (()=>{
		setFlag(props.flag)
	},[props.flag])

	function onClick(){
		props.history.push({
			pathname: '/Account/'+CurrentUser(),
			state: { id: CurrentUser() }
		});
	};
	
	return(
		<>
			<div id="transpalent" className={flag.toString()} onClick={()=>setFlag(false)}/>
			<Container className={flag.toString()} onClick={()=>setFlag(false)}>
				<Link to="Home"><p>Home</p></Link>
				<Link to="Game"><p>Game</p></Link>
				{IsSignedIn() ?(
					<>
						<p onClick={onClick}>Account</p>
						<Link to="ProfileEdit"><p>ProfileEdit</p></Link>
						<Link to="AccountEdit"><p>AccountEdit</p></Link>
						<Link to="AccountStatus"><p>AccountStatus</p></Link>
						<div onClick={() => AuthDelete()}><p className="fill">Logout</p></div>
					</>
				):(
					<>
						<Link to="Reword"><p>Rewordとは</p></Link>
						<Link to="SignIn"><p className="fill">SignIn</p></Link>
						<Link to="SignUp"><p className="fill">SignUp</p></Link>
					</>
				)}
			</Container>
		</>
	)
}
const Container = styled.nav`
	position: fixed;
	top: 70px;
	right: -220px;
	z-index: -1;
	margin: 0;
	padding: 0;
	height: 100%;
	cursor: pointer;
	list-style: none;
	background-color: ${Color.blue2};
	transition: ease 0.3s;
	&.true{
		right: 0px;
	}
	p{
		color:white;
		margin: 0;
		padding: 25px 50px;
		border-bottom: solid 1px white;
		font-weight: 600;
		&.fill{
			background: white;
			color: ${Color.blue2};
			border-bottom: solid 1px ${Color.blue2};
		}
	}
		
`

export default withRouter(RightBar)