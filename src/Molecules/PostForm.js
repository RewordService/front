import React,{useState} from 'react';
import styled from 'styled-components';
//scripts
import {PostPost} from '../Axios/PostsController';
import {IsSignedIn} from '../Axios/UsersController';
//partials
import {Content} from '../Atom/Content';
import {TextArea} from '../Atom/TextArea';
import {PostBtn} from '../Atom/Button';
import {Section} from '../Atom/Section'
import AuthScreen from '../Organisms/AuthScreen';

export default function PostForm(){
	const [body,setBody] = useState('')

	return(
		<Content>
			{!IsSignedIn() && 
				<AuthScreen/>
			}

			<Section>
				<h2>&#xf1d8;&nbsp;ミニ掲示板</h2>
			</Section>
			<Container>
			
				<TextArea value={body} onChange={(e)=>setBody(e.target.value)}/>
				<PostBtn type="button" value="&#xf1d8;" onClick={()=>{
					PostPost(body)
					setBody('')
				}}/>
			</Container>
		</Content>
	);
}


const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	textarea{
		margin: 0;
		border-radius: 5px 0 0 5px;
	}
`
