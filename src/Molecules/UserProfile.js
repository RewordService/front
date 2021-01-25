import React, {useState,useEffect} from 'react';
import styled from 'styled-components';
//scripts
import {UserInfo} from '../Axios/UsersController';
//partials
import {Section} from '../Atom/Section';
import {Content} from '../Atom/Content';


export default function UserProfile(props){
	const [name, setName]=useState('')
	const [created_date, setCreatedDate]=useState('')
	const [total, setTotal]=useState(0)
	const [intro, setIntro]=useState('')
	useEffect(()=>{
		UserInfo(props.id).then(res=>{
			setName(res.name)
			setCreatedDate(res.created_date)
			setIntro(res.intro)
			try{
				setTotal(res.rewords[0].total)
			}catch{
			}
		})
	},[props.id])
	return(
		<Content>
			<Section className="margin-none">
				<h2>プロフィール</h2>
				<Container>
					<div>
						<p>ユーザー名</p>
						<p><span>{name}</span></p>
					</div>
					<div className="line"/>
					<div>
						<p>Reword開始日</p>
						<p><span>{created_date}</span></p>
					</div>
					<div className="line"/>
					<div>
						<p>トータルスコア</p>
						<p><span>{total}</span></p>
					</div>
				</Container>
				<p>{intro}</p>
			</Section>
		</Content>
	);
}
const Container=styled.div`
	display: flex;
	justify-content: space-around;
	div{
		text-align: center;
		padding: 0 10px;
		&.line{
			padding:0;
			border-left: solid 1px #bababa;
		}
		>p{
			margin: 0;
			font-size: 12px;
		}
		span{
			font-size: 18px;
			font-weight: 600;
		}
	}
`
