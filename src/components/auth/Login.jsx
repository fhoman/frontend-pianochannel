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

    handleFormSubmit = (event) => {
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
    
      handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

  render() {

        return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" className="form-control" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          </div>
          <div className="form-group">
          <label>Password:</label>
          <input name="password"  type="password" className="form-control" value={this.state.password} onChange={ e => this.handleChange(e)} />
          </div>
          <input type="submit" value="Login" />
        </form>
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  }
}