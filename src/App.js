import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Subnavadmin from './components/Subnavadmin'
import Subnavstudent from './components/Subnavstudent'
import Login from './components/Login'
import Admin from './components/Admin'
import Students from './components/Students'
import Videos from './components/Videos'
import Video from './components/Video'
import Profile from './components/Profile'
import { Route,Switch } from 'react-router-dom';


export default class App extends Component {

  constructor(){
    super()
    this.state = {
        videos: [],
        role:'USER',
        user:''
    }      
}
 


  render() {

if (this.state.user === null ) {

  return (
    <div >
    <Header></Header>
    <Login></Login>
      
</div>
        )

}

else {


if (this.state.role === 'ADMIN') {

  return (
    <div >
        <Header></Header>
      <Subnavadmin></Subnavadmin>
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
        <Subnavstudent></Subnavstudent>
        <Switch>
      <Route path="/profile/:id" >
        <Profile ></Profile>
  
      </Route>
 
      </Switch>
      </div>
    )


  }
}

}
}

