import React,{useState, useEffect} from 'react';
import Observer from '@researchgate/react-intersection-observer';
//scripts
import {PostsIndex} from '../Axios/PostsController';
//partials
import PostList from '../Molecules/PostList';

export default function Posts (){
	const [posts, setPosts] = useState([])
	const [newPosts, setNewPosts] = useState([])
	const [scroll, setScroll] = useState(0)
	const [index, setIndex] = useState('empty')

	useEffect(()=>{
		let ws = new WebSocket(process.env.REACT_APP_WS)
		const data ={
			command: "subscribe",
			identifier:JSON.stringify({channel:"RoomChannel"})
		}

		ws.onopen=()=>{
			ws.send(JSON.stringify(data))
		}
		ws.onmessage=(e)=>{
			let msg = JSON.parse(e.data)
			if(
				msg.type === "ping" ||
				msg.type === "confirm_subscription" ||
				msg.type === "welcome"
			){
				return ;
			}else{
				setNewPosts(newPosts=>[...newPosts,...[JSON.parse(msg.message)]])
				setIndex(index=>index+1)
			}
		}

	},[])
	//did mount & did mount
	useEffect(()=>{
			PostsIndex(index).then(res => {
				setPosts(posts=>[...posts,...res])
				try{
					setIndex(res[res.length-1].id-1)
					console.log('データはないよ')
				}catch{
				}
			})
	},[scroll])
						
	return(
		<>
			{newPosts.map(post=>{
				return(
					<PostList
						key={post.id-scroll}
						id={post.id}
						userId={post.user_id}
						name={post.user.name}
						body={post.body} 
						created={post.created_date}
						url={post.user.image.url
					}/>
				);
			})}
			{posts.map(post=>{
				return(
					<PostList
						key={post.id}
						id={post.id}
						userId={post.user_id}
						name={post.user.name} 
						body={post.body} 
						created={post.created_date}
						url={post.user.image.url}
					/>
				);
			})}
			<Observer onChange={e=>{
					if(e.isIntersecting) setScroll(scroll+1)
				}}>
				<div/>
			</Observer>
		</>
	);
}
