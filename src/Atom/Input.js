import styled from 'styled-components';
import Color from '../Assets/Color';

export const Input = styled.input`
	display: block;
	padding: 12px 16px;
	width: 90%;
	margin: 0 auto;
	font-size: 12px;
	border: 1px solid ${Color.blue};
	border-radius: 5px;
	&:focus{
		border: 1px solid ${Color.blue2};
	}
`;

export const Search = styled.input`
	width: 300px;
	padding: 8px 16px;
	font-size: 14px;

	color: white;
	background: ${Color.blue};

	font-family: FontAwesome;

	border-radius: 15px;
	&::placeholder{
		color: white;
	}
	@media screen and (max-width: 1030px){
		width: 200px;
	}
	@media screen and (max-width: 600px) {
		display:none;
	}
`;
