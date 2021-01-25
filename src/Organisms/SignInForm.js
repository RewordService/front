import React from 'react';
import {withRouter,Link} from 'react-router-dom';
//partials
import {ErrorBox} from '../Atom/ErrorBox';
import {Btn} from '../Atom/Button';
import {Input} from '../Atom/Input';
import {Form, FormGroup} from '../Atom/Form';
//scripts
import {AuthPost} from '../Axios/AuthAction';

class SignInForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:"",
			passoword:"",
			errors: [],
		}
	}

	handleSubmit = () =>{	
		const url='/api/auth/sign_in'
		const data={
			email: this.state.email,
			password: this.state.password,
		}
		AuthPost(data,url).then(res=>this.setState({errors: res}))
	};

	render(){
		return(
			<Form onSubmit={this.handleSubmit} >
				<h2>SignIn</h2>
				<ErrorBox>
					{this.state.errors.map((error,i)=>{
						return <li key={i}>{error}</li>
					})}
				</ErrorBox>

				<FormGroup>
					<label htmlFor="email">email</label>
					<Input type="email" id="email" autocomplete="email" onChange={e => this.setState({email: e.target.value})}/>
				</FormGroup>

				<FormGroup>
					<label htmlFor="password">password</label>
					<Input type="password" id="password" autocomplete="password" onChange={e =>	this.setState({password: e.target.value})}/>
				</FormGroup>

				<Btn type="button" value="SignIn" style={{marginTop: '10px'}} onClick={this.handleSubmit}/>
				<div style={{marginTop: '10px'}}>
					<Link to='/SignUp'>>SignUp</Link>
				</div>
			</Form>
		);
	}
}

export default withRouter(SignInForm);
