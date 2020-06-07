import React, { Component } from 'react'
import { NavLink} from 'react-router-dom';
import AuthService from '../../services/auth-service'

export default class Subnavstudent extends Component {

    constructor(props){       
        super(props);
    this.state = { loggedInUser: null,username:null,role:null,active:true };
    this.service = new AuthService();
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



<div className="profile-options is-fullwidth">
<div className="tabs is-fullwidth is-medium">
<ul>

<li className="link" >
<NavLink to='/students' activeClassName="is-active">
<span className="icon">
<i className="fa fa-thumbs-up"></i>
</span>
<span>Students</span>
</NavLink>
</li>
<li className="link">
<NavLink to='/videos' activeClassName="is-active">
<span className="icon">
<i className="fa fa-search"></i>
</span>
<span>Videos</span>
</NavLink>
</li>
<li className="link">
<NavLink to='/login' onClick={() => this.logoutUser()} activeClassName="is-active">
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