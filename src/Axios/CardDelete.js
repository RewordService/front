import axios from 'axios';
import TokenHeaders from '../Axios/TokenHeaders';

export default async function CardDelete(){
	axios.delete('/cards',{headers:TokenHeaders()})	
	window.location.reload();
}