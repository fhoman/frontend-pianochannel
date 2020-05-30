import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Subnavstudent extends Component {
    render() {
        return (
            <div className='subnav'>
            <ul>
           
         <li>    <Link to='/profile'>Profile</Link></li>  
    
 
          </ul> 
 
         </div>
        )
    }
}
