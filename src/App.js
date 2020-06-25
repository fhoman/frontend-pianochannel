import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Home from './components/Home'
import Subnavadmin from './components/admin/Subnavadmin'
import Subnavstudent from './components/user/Subnavstudent'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Students from './components/admin/Students'
import Videos from './components/admin/Videos'
import Video from './components/admin/Video'
import Profile from './components/user/Profile'
import { Route,Switch} from 'react-router-dom';
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

checkAuthenticated = () => {
  console.log('check authenticated')
  if(this.state.username === null) {
    this.service.isAuthenticated()
    .then(response => {
      console.log(response)
      this.setState({
        username: response.username,
        role:response.role,
        loading: false
      })
      })
      .catch( err => {
        this.setState({
          username: false,
          role:false,
          loading: false
        })
    })
  }
}
 
setUser = (user) => {
  console.log(user)
  this.setState({username:user.username,role:user.role})
}

  render() {
    this.checkAuthenticated()    
    if(this.state.loading) {
      return <p>loading</p>
    }

if (this.state.role === 'ADMIN') {
  return (
    <div >      
        <Header></Header>
      <Subnavadmin userInSession={this.state.loggedInUser} setUser={this.setUser} ></Subnavadmin>
      <Switch>
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
        <Subnavstudent userInSession={this.state}  setUser={this.setUser}></Subnavstudent>
        <Switch>
        
      <Route exact path="/myprofile/:id" >
        <Profile user={this.state.username} setUser={this.setUser}></Profile>      
      </Route> 
 
      </Switch>
      </div>
    )


  }

  return (
    <div >
    <Header></Header>
   
    <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path='/login' render={() => <Login setUser={this.setUser} />} />
    <Route exact path='/signup' component={Signup} />    
    </Switch> 
   
</div>
        )


}
}