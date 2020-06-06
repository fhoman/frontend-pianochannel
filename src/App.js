import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Subnavadmin from './components/admin/Subnavadmin'
import Subnavstudent from './components/user/Subnavstudent'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Admin from './components/admin/Admin'
import Students from './components/user/Students'
import Videos from './components/admin/Videos'
import Video from './components/admin/Video'
import Profile from './components/user/Profile'
import { Route,Switch } from 'react-router-dom';
import AuthService from '../src/services/auth-service'

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
        videos: [],
        role:null,
        username:null,
        loggedInUser:null,
        loading: false
    }
     this.service = new AuthService();     
}


fetchUser(){
  if( this.state.loggedInUser === null ){
    this.service.loggedin()
    .then(response =>{
      this.setState({
        loggedInUser:  response
      }) 
    })
    .catch( err =>{
      this.setState({
        loggedInUser:  false
      }) 
    })
  }
}
 
setUser = (user) => {
  console.log(user)
  this.setState({username:user.username,role:user.role})
}

  render() {


    if(this.state.loading) {
      return <p>loading</p>
    }



if (this.state.role === 'ADMIN') {

  return (
    <div >
        <Header></Header>
      <Subnavadmin userInSession={this.state.loggedInUser} setUser={this.setUser} ></Subnavadmin>
      <Switch>
    <Route path="/admin" > <Admin ></Admin>

    </Route>
    <Route path="/students" component={Students}></Route>
    <Route exact path="/videos" component={Videos} ></Route>
    <Route exact path="/video/:id" component={Video} ></Route>
 
    </Switch>
    </div>
  )
  }

  else if (this.state.role === 'USER') {

    return (
      <div >
        

      <Header></Header>
        <Subnavstudent userInSession={this.state.loggedInUser}  setUser={this.setUser}></Subnavstudent>
        <Switch>
      <Route path="/profile/:id" >
        <Profile ></Profile>
  
      </Route>
 
      </Switch>
      </div>
    )


  }

  return (
    <div >
    <Header></Header>
    <Switch>
    <Route path='/login' render={() => <Login setUser={this.setUser} />} />
    <Route path='/signup' component={Signup} />
    </Switch> 
</div>
        )


}
}

