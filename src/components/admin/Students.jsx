import React, {Component} from 'react';
import AdminService from '../../services/admin-service'

export default class Students extends Component {

    constructor(){
      super()
      this.state = {
          users: [],
          email:''
      }      
  } 

  componentDidMount() {
    AdminService.fetchStudents()
    .then(data => {     
        this.setState({ users:data.data })        
        console.log(this.state)
    }).catch(err => console.log(err))
       }

   handleChange = (event) => {  
     console.log(event.target.value)
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

  onSubmit = () => {
    AdminService.mailNewUser(this.state.email)
   console.log('submit')
  }
  
    render() {
  
  
    return (
      <div >
        <button onClick={()=> this.onSubmit()}>Invite student</button><input name='email' type='email' value={this.state.username} onChange={(e)=> this.handleChange(e)}></input>
          {this.state.users.map((user,index) =>    
         <div key={index} >
         {user.username}<p></p>        
               </div>              
         )}
      </div>
    )
  }
  }