import React from 'react';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
//img
import img from '../Assets/Img/home.jpg'
//partials
import {FlexJustify} from '../Atom/FlexJustify';
import {Content} from '../Atom/Content';
import {Section} from '../Atom/Section';
import NewUsers from '../Organisms/NewUsers';
import TotalUsers from '../Organisms/TotalUsers';
import SlideBar from '../Organisms/SlideBar';
import Posts from '../Organisms/Posts';
import SNSIcon from '../Molecules/SNSIcon';
import PostForm from '../Molecules/PostForm';
import Banners from '../Atom/Banner';
import LeftBar from '../Organisms/LeftBar';
import News from '../Organisms/News';
import RewordInfo from '../Organisms/RewordInfo';

function Home (props){
	return(
		<>
			<Img>
				<p>Rewordを継続して能力開発を行う。</p>
			</Img>
			<SlideBar/>
			<RewordInfo/>
			<News/>
			<FlexJustify>
				<SNSIcon/>
				<LeftBar/>
				<div>
					<Content>
						<Section className="margin-none">
								<h2>&#xf234;&nbsp;新規ユーザー</h2>
								<NewUsers/>
						</Section>
					</Content>
					<Content>
						<Section className="margin-none">
								<h2>&#xf501;&nbsp;スコアランキング</h2>
								<TotalUsers/>
						</Section>
					</Content>
					<Banners/>
					<PostForm/>
					<Posts/>
				</div>
			</FlexJustify>
		</>
	);
}
const Img=styled.div`
	position: relative;
	height: 400px;
	width: 100%;
	margin: -30px 0 0 0;
	text-align: center;
	background-image: url(${img}); 
	background-size: cover;
	background-position: center;
	&::before{
		content: 'ワーキングメモリを鍛えよう!';
		position: relative;
		z-index: 1;
		padding: 10px;
		color: white;
		background: rgba(0,0,0,0.3);
		line-height: 400px;
		text-align: center;
		font-weight: 900;
		font-size: 30px;
	}
	&::after{
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 0;
		background: rgba(0,0,0,0.3);
	}
	p{
		color: white;
		position: absolute;
		top: 60%;
		left: 50%;
		z-index: 1;
		
		margin: auto;
		font-weight: 600;
		letter-spacing: 13px;
		transform: translateX(-50%);
   		-webkit-transform: translateX(-50%);
   		-ms-transform: translateX(-50%);
	}
	@media screen and (max-width: 500px){
		height: 300px;
		&::before{
			line-height: 300px;
			font-size: 25px;
		}
		p{
			display: none;
		}
	}
`
export default withRouter(Home)


