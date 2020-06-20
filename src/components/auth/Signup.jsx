import React, { Component } from 'react'
import AuthService from '../../services/auth-service'
import {Link} from 'react-router-dom'
import { FaEnvelope,FaLock,FaCheck } from "react-icons/fa";

export default class Signup extends Component {

    state = {
            username: '',
            password: '',          
            service: new AuthService(),
            submitted: false
    }


componentDidMount(){

  const url_string = window.location.href
  const url = new URL(url_string);

  const mail = url.searchParams.get("mail");
  if (mail) {
  console.log(mail);
  this.setState({username:mail})
  }
  return null
}





handleSubmit = (e) => {
  e.preventDefault();
  this.setState({validationmessage:''})
  if (this.state.username === '' || this.state.password === '') {
    const message = 'Please fill in a username and a password'
    this.setState({validationmessage:message})  
  return 
  }
  
  this.state.service.signup(this.state.username, this.state.password)
  .then(user => {  
  const {username,password} = user.data.user
  if (username && password) {
  this.setState({submitted: true,username:'',password:'',validationmessage:''})
  console.log(this.props)
  }})          
  .catch(err => console.log(err))
  const message = 'This username already exists'
  this.setState({validationmessage:message})
      }

    handleInput = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value})
    }

    render() {

        return (
         
 <>
        
 <div className="columns is-multiline">
 <div className="column is-8 is-offset-2 register">
   
  
  
   <div className="columns">

   <div className="column left">
   <div className="notification is-light"> 
     <h1 className="title is-1">Pianolessen Amsterdam</h1>
     <h2 className="subtitle has-text-danger">Sign up and check your videos</h2>
     <p>Sign up for an account on Pianolessen Amsterdam and check out all your videos </p>
     </div>
   </div>


     <div className="column is-half right">
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
             <input className="input" type="password" value={this.state.password} name='password' 
              onChange={(e) => this.handleInput(e)} placeholder="Password"></input>
             <span className="icon is-small is-left">
             <FaLock/>
             </span>
           </p>
           <p className="help is-danger">{this.state.validationmessage}</p>
         </div>
         <button className="button is-info is-rounded mb-6" onClick={(e)=> this.handleSubmit(e)}>Signup</button>
         <p className="control mt-6" >
Already have a account? 
       <Link to={"/login"}>Login</Link>        
   </p>  
       </div>
       
     </div>
     
   </div>
   
 </div>
</div> </>
        );

    }
}