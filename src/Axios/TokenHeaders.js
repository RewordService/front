import {AuthDelete} from './AuthAction';

 export default function TokenHeaders(){
	let headers
	try{
	const storageHeader=JSON.parse(localStorage.Reword).headers
	headers = {
		'Content-Type': 'application/json',
		'accesstoken': storageHeader.accesstoken,
		'client': storageHeader.client,
		'uid': storageHeader.uid,
	} 
	}catch{
		AuthDelete();
		return null
	}
	return {headers: headers}
}
