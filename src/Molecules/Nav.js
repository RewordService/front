import React,{useState} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom'
//script
import {CurrentUser,IsSignedIn} from '../Axios/UsersController';
//partials
import {FlexJustify} from '../Atom/FlexJustify';
import {NavBtn,FillNavBtn} from  '../Atom/Button';
import NavLink from '../Atom/NavLink';
import RightBar from '../Organisms/RightBar';

function Nav (props){
	const [flag,setFlag]= useState(false)
	
	function onClick(){
		props.history.push({
      		pathname: '/Account/' + CurrentUser(),
      		state: { id: CurrentUser() }
  		});
	};

	return(
		<Container>
			<NavBtn className="pc"><NavLink text="Home"/></NavBtn>
			<NavBtn className="pc"><NavLink text="Game"/></NavBtn>
			{IsSignedIn() ?
				(
					<>
						<NavBtn className="pc" style={{color: 'white',cursor: 'pointer'}} onClick={onClick}>Account</NavBtn>	
						<FillNavBtn className="pc"> <NavLink text ="Logout"/> </FillNavBtn>
					</>
				):(
					<>
						<NavBtn className="pc"> <NavLink text="Reword"/> </NavBtn>
						<FillNavBtn className="pc"> <NavLink text="SignIn"/> </FillNavBtn>
						<FillNavBtn className="pc"> <NavLink text="SignUp"/> </FillNavBtn>
					</>
				)
			}
			<i className="fas fa-bars" onClick={()=>setFlag(!flag)}/>
			<RightBar flag={flag.toString()}/>
		</Container>
	);
}

const Container = styled(FlexJustify)`
	i{
		cursor: pointer;
		display: none;
		color: white;
		font-size: 30px;
	}
	@media screen and (max-width:1030px){
		i{
			display: inline;
		}
		.pc{
			display: none
		}
	}
`

export default withRouter(Nav)