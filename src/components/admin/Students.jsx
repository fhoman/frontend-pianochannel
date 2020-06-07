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

  onSubmit = (e) => {
    e.preventDefault();
      AdminService.mailNewUser(this.state.email)
    
      this.setState({email:''})
  
    

  }
  
    render() {
  
  
    return (
      <div >

<div className="box" >

<div className="columns">


<div className="column is-2-tablet is-4-mobile has-text-centered">
<p className="stat-val">{this.state.totalVideos}</p>





</div>
<div className="column is-8">
<div className="field has-addons">
  <div className="control">
    <input className="input" onChange={(e)=> this.handleChange(e)} name='email' value={this.state.email} type="email" placeholder="Email adress"></input>
  </div>
  <div className="control">
    <a href='/students' onClick={(e)=> this.onSubmit(e)}  className="button is-info">
     Invite student
    </a>
  </div>
</div>
</div>
</div>
</div>


<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
        <th>Profile picture</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Telephone</th>
        </tr>
      </thead>
      <tbody>

          {this.state.users.map((user,index) =>    
         
         <tr key={user.id}>
            <td><span className='student-profile-small'><img src={user.image} alt={user.name}></img></span></td>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.username}</td>
          <td>{user.number}</td>
        </tr>


         )}
              </tbody>
    </table>
      </div>
    )
  }
  }