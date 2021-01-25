import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
import Color from '../Assets/Color';
//scripts
import {newUsers} from '../Axios/UsersController';
//partials
import MiniCard from '../Molecules/MiniCard';
import {FlexJustify} from '../Atom/FlexJustify';

export default function NewUsers (){
	const [users, setUsers] = useState([])
	useEffect(()=>{
		newUsers().then(res=>{
			setUsers(res.data)
		})
	},[])
		return(
			<Container className="cards">
				{users.map((user)=>{
					return <MiniCard className="card" key={user.id} id={user.id} name={user.name} url={user.image.url}/>
				})}
			</Container>
		);
}
const Container = styled(FlexJustify)`
	position: relative;
	justify-content: start;
	overflow-x: scroll;
	box-sizing: border-box;
	padding-right: 30px;
	::-webkit-scrollbar{
		height: 10px;
	}
	::-webkit-scrollbar-track{
		background: #EEE;
		border-left: solid 1px #ececec;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb{
		background: ${Color.blue};
		border-radius: 10px;
		box-shadow: inset 0 0 0 2px #fff;
	}    
`
