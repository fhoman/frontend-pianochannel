import React, { Component } from 'react'
import AdminService from '../services/admin-service'

export default class Admin extends Component {

state = {username:''}

handleInput = (e) => {
    let {name, value} = e.target
      this.setState({[name]: value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
   
    AdminService.addStudent({user:this.state.username})
    .then(student => console.log('student added'))
    .catch(err => console.log(err))

  }

    render() {
        return (
            <div>
            <form  onSubmit={(e) => this.handleSubmit(e)}>
       
        <label>Username</label>
        <input onChange={(e) => this.handleInput(e)} name='username' value={this.state.user}></input>
           
        
        <input type="submit" className="input search-bar" value="submit"/>
        </form>
            </div>
        )
    }
}
