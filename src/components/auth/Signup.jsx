import React, { Component } from 'react'
import AuthService from '../../services/auth-service'
import {Redirect} from 'react-router-dom'
export default class Signup extends Component {

    state = {
            username: '',
            password: '',          
            service: new AuthService(),
            submitted: false
    }

     handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.state.service.signup(this.state.username, this.state.password)
        .then(user => {
          this.setState({submitted: true,username:'',password:''})
        })
    }

    handleInput = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value})
    }

    render() {

      if(this.state.submitted) {
        return <Redirect to='/login' />
      }
        return (
<div className='form-container'>

<form className="signup-form" onSubmit={(e) => this.handleSubmit(e)}>
<div className="field">
  <p className="control has-icons-left has-icons-right">
    <input className="input" type="email"  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleInput(e)} placeholder="Email"></input>
    <span className="icon is-small is-left">
      <i className="fas fa-envelope"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-check"></i>
    </span>
  </p>
</div>
<div className="field">
  <p className="control has-icons-left">
    <input className="input" type="password" placeholder="Password"  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleInput(e)}></input>
    <span className="icon is-small is-left">
      <i className="fas fa-lock"></i>
    </span>
  </p>
</div>
<div className="field">
  <p className="control">
    <button className="button is-success" type="submit">
      Signup
    </button>
  </p>
</div>
</form>



          </div>
        );
    }
}