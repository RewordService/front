import React, {useState} from 'react';
import styled from 'styled-components';
import news from '../Assets/news'; 
import Color from '../Assets/Color';
//scripts
import {IsSignedIn} from '../Axios/UsersController';
//partials
import {Content} from '../Atom/Content';
import {Section} from '../Atom/Section';
import {FlexJustify} from '../Atom/FlexJustify';


export default function News(){
	const [flag,setFlag] = useState(IsSignedIn())
	return(
		<FlexJustify>
			<Container className={flag.toString()}>
				<Section>
					<h2>&#xf129;&nbsp;お知らせ</h2>
				</Section>
				<Rows>
					{news.news.map((news,i)=>{
						return <NewsRow key={i} url={news.url} title={news.title} date={news.date}/>
					})}
				</Rows>
			</Container>
		</FlexJustify>
	);
}

function NewsRow(props){
	return(
		<Row href={props.url} rel="noopner norefere" target="_blank">{props.title}  <p>{'('+props.date+')'}</p></Row>
	);
}

const Row = styled.a`
	display: block;
	padding: 5px 0;
	padding-left: 30px;
	border-bottom: solid 1px #bababa;
	&:hover{
		color: ${Color.blue};
	}
	p{
		display: inline;
		padding-left: 30px;
		color: #bababa;
	}
`
const Rows = styled.div`
	height: 150px;
	overflow-y: scroll;
	::-webkit-scrollbar{
		width: 15px;
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

const Container = styled(Content)`
	width: 1060px;
	margin-bottom: 10px;	
	transform: translateX(5px);
	&.false{
		width: 800px;
		transform: translateX(0px);
		@media screen and (max-width: 800px){
			width: 600px;
		}
		@media screen and (max-width: 500px){
			width: 350px;
		}
	}
`
