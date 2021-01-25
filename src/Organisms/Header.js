import React, {useState} from 'react';
import styled from 'styled-components';
import {Link,withRouter} from 'react-router-dom';
import Color from '../Assets/Color';
//scripts
import {IsSignedIn} from '../Axios/UsersController';
//partials
import Nav from '../Molecules/Nav';
import {FlexJustify}from '../Atom/FlexJustify';
import {Search} from '../Atom/Input';

function Header (props){
	const [search, setSearch] = useState('')

	function SearchResult(e){
		if (e.keyCode === 13){
			props.history.push({
				pathname: 'SearchResult',
				state: {name_cont: search}
			});
		}
	}
		
	return(
		<Container>
			<Link to={IsSignedIn() ? ('/Home'):('/Reword')}><Title><i className="fab fa-medapps"/>REWORD</Title></Link>
			<Search onKeyDown={(e)=>SearchResult(e)} onChange={e=>setSearch(e.target.value)} placeholder="&#xf002; UserSearch" />
			<Nav/>
		</Container>
	);
}

const Container = styled(FlexJustify)`
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	padding: 0 30px;
	z-index: 2;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	align-items: center;
	background: ${Color.blue2};
	#transpalent{
		display: none;
		transition: ease 3s;
	}
	#transpalent.true{
		background: rgba(0,0,0,0.3);
		display: block;
		position: fixed;
		top:0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
	}
`
const Title = styled.h2`
	color: white;
	i{
		margin: 0 10px;
		font-size: 30px;
	}
`

export default withRouter(Header)
