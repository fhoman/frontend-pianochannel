import React from 'react'
import { Link } from 'react-router-dom';

export default function Subnavadmin() {
    return (
        <div className='subnav'>
           <ul>
          
        <li>    <Link to='/admin'>Home admin</Link></li>  
        <li>       <Link to='/students'>Students</Link></li>  
        <li>   <Link to='/videos'>Videos</Link></li>  

         </ul> 

        </div>
    )
}
