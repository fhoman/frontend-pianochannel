import React, { Component } from 'react'
import AuthService from '../../services/auth-service'
import {Redirect} from 'react-router-dom'
export default class Signup extends Component {

    state = {
            username: '',
            password: '',
            name:'',
            surname:'',
            number:0,
            service: new AuthService(),
            submitted: false
    }

     handleSubmit = (e) => {
        e.preventDefault();
        this.state.service.signup(this.state.username, this.state.password,this.state.name,this.state.surname,this.state.number)
        .then(user => {
          this.setState({submitted: true})
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
          <div>
            <div className="signup-container">
              <form
                className="signup-form"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <label htmlFor="name">Username</label>
                <input required
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={(e) => this.handleInput(e)}
                />
                <label htmlFor="name">Name</label>
                <input required
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleInput(e)}
                />
                <label htmlFor="name">Surname</label>
                <input required
                  type="text"
                  name="surname"
                  value={this.state.surname}
                  onChange={(e) => this.handleInput(e)}
                />
                <input required
                  type="number"
                  name="number"
                  value={this.state.number}
                  onChange={(e) => this.handleInput(e)}
                />

                <label htmlFor="tagline">Password</label>
                <input required
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleInput(e)}
                />
                
                <button className="signup-button" type="submit">Signup!</button>
              </form>
            </div>
          </div>
        );
    }
}