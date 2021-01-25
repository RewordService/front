import axios from 'axios';
import TokenHeaders from './TokenHeaders';
import {CurrentUser} from './UsersController';
import {AuthDelete} from './AuthAction';

export function GamePost(num,string,redirect){
	
	let ordinal = ['','','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
	let data={
		[ordinal[num]+string]: 1,
		user_id: CurrentUser(),
	};
	 
	axios.post('/rewords',data, TokenHeaders())
	.catch(error=>{
		AuthDelete();
	})
}

let data
export async function GameIndex(){
	await axios.get('/rewords')
	.then(res=>{
		data = res.data
	})
	return data
}




