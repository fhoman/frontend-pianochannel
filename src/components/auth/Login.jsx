import React, { Component } from 'react'
import AuthService from '../../services/auth-service'
import { Link } from 'react-router-dom';

export default class Login extends Component {


    state = {
        username: '',
        password: '',
        service: new AuthService(),
        formSubmit: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.state.service.login(username, password)
        .then( response => {
            this.setState({ username: "", password: "",formSubmit:true });
            console.log(response)
            this.props.setUser(response);          
        })
        .catch( error => console.log(error) )
      }
    
      handleInput = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

  render() {

        return (
          <>
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
                Login
              </button>
            </p>          </div>


            <div className="field">
            <p className="control">
            Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        
        </p>  
      </div>

          </form>        
          
          <p></p>     
      
      
     
      </div>
       
            </>
    )
  }
}