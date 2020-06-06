import React, {Component} from 'react';
import PianoApi from '../../services/admin-service'

export default class Students extends Component {

    constructor(){
      super()
      this.state = {
          users: []
      }      
  }
   
  componentDidMount() {
    PianoApi.fetchStudents()
    .then(data => {
     
        this.setState({ users:data.data })
        
        console.log(this.state)
    }).catch(err => console.log(err))
       }
  
  
    render() {
  
  
    return (
      <div >
          {this.state.users.map((user,index) =>    
         <div key={index} >
         {user.username}<p></p>        
               </div>              
         )}
      </div>
    )
  }
  }