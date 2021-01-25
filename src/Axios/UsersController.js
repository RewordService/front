import axios from 'axios';
import TokenHeaders from './TokenHeaders'; 
import {AuthDelete} from './AuthAction';


/* helper */
export function CurrentUser(){
	/* return only id */
	let id;
	try{
		id=JSON.parse(localStorage.Reword).data.data.id
	}catch{
	}
	return id
}

export function IsSignedIn(){
	return !!localStorage.getItem('Reword')
}


/* index */
let data
export async function Users(search){
	await axios.get('/users',search)
	.then(res=>{
		data=res
	})
	return data
}

/* new users */
export async function newUsers(){
	await axios.get('/users/new_users')
	.then(res=>{
		data=res
	})
	return data
}

/* total users */
export async function totalUsers(){
	await axios.get('/users/total_users')
	.then(res=>{
		data=res
	})
	return data
}

/* show */
export async function UserInfo(id){
	let data
	if (IsSignedIn()){
		/* if loggedin , add header*/
		await axios.get('/users/'+id, TokenHeaders())
		.then(res=>{
			data = res.data
		})
		.catch(err=>{
			AuthDelete();
			console.log(err.response)
		})
	}else{
		/* unless loggedin、header none*/
		await axios.get('/users/'+id)
		.then(res=>{
			data = res.data
		})
		.catch(err=>{
			console.log(err.response)
		})
	}
	return data
}

/* patch */
export async function UserPatch (data) {
	await axios.patch('api/auth',data, TokenHeaders())
	.then(res=>{
		data = res.data
		let flash = document.getElementById('flash')
		flash.style.top='-15px'
		setTimeout(()=>{
			flash.style.top='-60px'
		},4000)
	})
	.catch(err=>{
		AuthDelete();
	})
	return data
}

/* password patch */
export async function PasswordPatch (data){
	await axios.put('/api/auth/password',data, TokenHeaders())
	.catch(err=>{
		AuthDelete();
	})
	window.location.reload();
}

/* delete */
export async function UserDelete (){
	await axios.delete('/cards', TokenHeaders())
	await axios.delete('/api/auth', TokenHeaders())
	AuthDelete();
}
