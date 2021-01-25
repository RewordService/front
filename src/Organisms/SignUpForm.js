import React from "react"
import {withRouter, Link} from "react-router-dom"
//partials
import {ErrorBox} from "../Atom/ErrorBox"
import {Btn} from "../Atom/Button"
import {Input} from "../Atom/Input"
import {Form, FormGroup} from "../Atom/Form"
//function
import {AuthPost} from "../Axios/AuthAction"

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      agree: false,
      errors: [],
    }
  }

  handleSubmit = () => {
    if (!this.state.agree) {
      return this.setState({errors: ["利用規約に同意をしてください"]})
    } else {
      const data = {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      }
      const url = "/api/auth"
      AuthPost(data, url).then(res => this.setState({errors: res}))
    }
  }

  render() {
    return (
      <Form>
        <h2>SignUp</h2>
        <ErrorBox>
          {this.state.errors.map((error, i) => {
            return <li key={i}>{error}</li>
          })}
        </ErrorBox>

        <FormGroup>
          <label htmlFor="email">email</label>
          <Input
            type="email"
            id="email"
            autocomplete="email"
            onChange={e => this.setState({email: e.target.value})}
            placeholder="Email"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="name">name</label>
          <Input
            type="text"
            id="name"
            autocomplete="name"
            onChange={e => this.setState({name: e.target.value})}
            placeholder="10文字以内"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">password</label>
          <Input
            type="password"
            id="password"
            autocomplete="new-password"
            onChange={e => this.setState({password: e.target.value})}
            placeholder="8文字以上"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password_confirmation">password_confirmation</label>
          <Input
            type="password"
            id="password_confirmation"
            autocomplete="off"
            onChange={e =>
              this.setState({password_confirmation: e.target.value})
            }
            placeholder="(確認)"
          />
        </FormGroup>

        <Btn
          type="button"
          value="SignUp"
          style={{marginTop: "10px"}}
          onClick={this.handleSubmit}
        />
        <p>
          <input
            type="checkbox"
            onClick={() => this.setState({agree: !this.state.agree})}
          />
          <Link to="/Terms" target="_blank">
            利用規約
          </Link>
          に同意する
        </p>
        <div style={{marginTop: "10px"}}>
          <Link to="/SignIn">SignIn</Link>
        </div>

        <div></div>
      </Form>
    )
  }
}

export default withRouter(SignUpForm)
