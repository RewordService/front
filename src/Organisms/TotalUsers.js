import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Color from '../Assets/Color';
//scripts
import {totalUsers} from '../Axios/UsersController';
//partials
import MiniCard from '../Molecules/MiniCard';
import {FlexJustify} from '../Atom/FlexJustify';

export default function TotalUsers (){
	const [users,setUsers] = useState([])
	useEffect(()=>{
		totalUsers().then( res=>{
			setUsers(res.data)
		});
	},[])

	return(
		<Container className="cards">
			{users.map((user,i)=>{
				return (
					<div key={user.id} style={{margin: '0',textAlign: 'center'}}>
						{i < 3 ? ( 
							<i className="fas fa-crown"/> ):(
							<i className="fas fa-thumbs-up"/>
						)}
						<h3 style={{margin: '0'}}>{i+1}位</h3>
						<MiniCard  id={user.id} name={user.name} url={user.image.url}/>
					</div>
				);
			})}
		</Container>
	);
}

const Container = styled(FlexJustify)`
	justify-content: start;
	overflow-x: scroll;
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
	div:first-child>i{
		color: ${Color.gold};
	}
	div:nth-child(2)>i{
		color: ${Color.silver};
	}
	div:nth-child(3)>i{
		color: ${Color.bronze};
	}
	i{
		color: ${Color.blue};
	}
`
