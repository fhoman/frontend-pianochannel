import React, { Component } from 'react'
import AuthService from '../../services/auth-service'
import { Link,Redirect } from 'react-router-dom';
import { FaEnvelope,FaLock,FaCheck } from "react-icons/fa";

export default class Login extends Component {


    state = {
        username: '',
        password: '',
        usernameTemp:'',
        role: '',

        service: new AuthService(),
        formSubmit: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.state.service.login(username, password)
        .then( response => {

          console.log(response)
            this.setState({ username: "", password: "",role:response.role, 
            usernameTemp:response.username,formSubmit:true });
            console.log(this.state)
            this.props.setUser(response);          
        })
        .catch( error => console.log(error) )
      }
    
      handleInput = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

  render() {

const URL = `/myprofile/${this.state.usernameTemp}`
    if(this.state.formSubmit && this.state.role === 'USER') {
      return <Redirect to={URL} />
    }

    else if (this.state.formSubmit && this.state.role === 'ADMIN') {
      return <Redirect to={'/students/'} />

    }

        return (
          <>
         <div className="columns is-multiline">
      <div className="column is-8 is-offset-2 register">
      
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="notification is-light">
             
              <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input" type="email" value={this.state.username} name='username' onChange={(e) => this.handleInput(e)} placeholder="Email"></input>
                  <span className="icon is-small is-left">
                  <FaEnvelope/>
                  </span>
                  <span className="icon is-small is-right">
                  <FaCheck/>
		    </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Password:</label>
                <p className="control has-icons-left">
                  <input className="input" type="password" value={this.state.password} name='password'  onChange={(e) => this.handleInput(e)} placeholder="Password"></input>
                  <span className="icon is-small is-left">
                  <FaLock/>
                  </span>
                </p>
              </div>
              <button className="button is-info is-rounded mb-6" onClick={(e)=> this.handleSubmit(e)}>Login</button>
              <p className="control mt-6" >
 Don't have an account? 
            <Link to={"/signup"}>Signup</Link>        
        </p>  
            </div>
            
          </div>
          
        </div>
        
      </div>
    </div>
       
            </>
    )
  }
}