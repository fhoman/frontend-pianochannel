import React, { Component } from 'react'
import {NavLink } from 'react-router-dom';
import AuthService from '../../services/auth-service'

export default class Subnavstudent extends Component {

    constructor(props){       
        super(props);
    this.state = { loggedInUser: null,username:null,role:null };
    this.service = new AuthService();
  }

  //componentDidUpdate(nextProps) {
  //  console.log(nextProps)
  //  this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  //}

    logoutUser = () =>{
        console.log(this.props)
        this.service.logOut()
        .then(() => {
          this.setState({ loggedInUser: null });
          console.log(this.props)
          this.props.setUser({username:null,role:null,loggedInUser:null});  
        })
      }

componentDidMount() {
 const {username,loggedInUser} = this.props.userInSession
 this.setState({username,loggedInUser})
}

    render() {


        return (




<div className="profile-options is-fullwidth">
<div className="tabs is-fullwidth is-medium">
<ul>

<li className="link" >
<NavLink to={`/myprofile/${this.state.username}`} activeStyle={{color:"red"}}>
<span className="icon">
<i className="fa fa-thumbs-up"></i>
</span>
<span>Profile</span>
</NavLink>
</li>

<li className="link">
<NavLink to='/login' onClick={() => this.logoutUser()} activeStyle={{color:"red"}}>
<span className="icon">
<i className="fa fa-balance-scale"></i>
</span>
<span>Logout</span>
</NavLink>
</li>
</ul>
</div>
</div>











        )
    }
}
