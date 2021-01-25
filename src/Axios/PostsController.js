import axios from 'axios';
import TokenHeaders from './TokenHeaders'
import {CurrentUser} from './UsersController';


// index
let data;
export async function PostsIndex(id){
	data = {
		params:{
			id: id
		}
	}
	await axios.get('/posts',data)
	.then(res=>{
		data = res.data
	})
	return data;
}

//show
export async function PostShow(id){
	data = {
		params:{
			id: id
		}
	}
	await axios.get('/posts/'+id,data)
	.then(res=>{
		data = res .data
	})
	return data;
}



// post
export async function PostPost(body){
	data = {
		body: body,
		user_id: CurrentUser()
	}
	await axios.post('/posts', data, TokenHeaders())
}

// destroy
export async function PostDelete(id){
	await axios.delete('/posts/'+id , TokenHeaders())
}

