import styled from 'styled-components';

export const Form = styled.form`
	width: 30%;
	padding: 20px;
	margin: 20px auto;
	margin-top: 87px;
	background: white;
	h2{
		text-align: center;
	}
		filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.3));
	@media screen and (max-width: 1000px){
		width: 80%;
	}
`

export const FormGroup = styled.div`
	margin: 15px 0;
`

export const FormSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
