import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service'

export default class Subnavstudent extends Component {

    constructor(props){       
        super(props);
    this.state = { loggedInUser: null,username:null,role:null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]});
  }

    logoutUser = () =>{
        console.log(this.props)
        this.service.logOut()
        .then(() => {
          this.setState({ loggedInUser: null });
          console.log(this.props)
          this.props.setUser({username:null,role:null,loggedInUser:null});  
        })
      }



    render() {


        return (
            <div className='subnav'>
            <ul>
           
         <li>    <Link to='/profile'>Profile</Link></li>  
         <li>    <Link to='/login' onClick={() => this.logoutUser()}>Logout</Link></li> 
 
          </ul> 
 
         </div>
        )
    }
}
