import styled from 'styled-components'
import Color  from '../Assets/Color';

//normal
export const Btn = styled.input`
	padding: 10px 15px;
	border-radius: 5px;
	font-size: 13px;
	color: white;
	background: ${Color.purple};
	cursor: pointer;
	
	&:hover{
		transition: 0.3s ease;
		background: #83438f;
	}
`
export const AlertBtn = styled(Btn)`
	background: ${Color.red};
	&:hover{
		background: red;
	}	
`
// Large Btn
export const BtnLG = styled.div`
	display: inline;
	text-align: center;
	margin: 20px;
	padding: 10px 70px;
	border-radius: 30px 30px;
	font-size: 20px;
	font-weight: bold;
	cursor: pointer;
	transition: ease 0.4s;
`

export const SignUpBtn = styled(BtnLG)`
	color: white;
	background: #0fabff;
	&:hover{
		background: #4cd0f5;
	}
`

export const SignInBtn = styled(BtnLG)`
	color: #0fabff;
	background-color: white;
	border: solid 3px #EEE;
	&:hover{
		background:#e8e8e8;
	}
`

// navigation btn
export const NavBtn = styled.div`
	font-weight: 600;
	margin-right: 30px;
	a{	
		padding: 8px;
		color : white;
	}
`
export const FillNavBtn = styled(NavBtn)`
	a{
		background: white;
		color : ${Color.blue2};
	}
	div{
		display: inline;
		background: white;
		padding: 8px;
		color : ${Color.blue2};
		&:hover{
			cursor:pointer;
		}
	}
`
export const PostBtn = styled.input`
	width: 20%;
	background: ${Color.blue};
	color: white;
	font-family: "Font Awesome 5 Free"; 
	font-weight: 900;
	font-size: 24px;
	border: solid 2px ${Color.blue};
	&:hover{
		background: ${Color.blue2};
	}

`

