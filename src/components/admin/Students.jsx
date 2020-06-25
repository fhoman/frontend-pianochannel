import React, {Component} from 'react';
import AdminService from '../../services/admin-service'
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import Modal from 'react-modal'


const customStyles = {
  content : {
    top                   : '20%',
    left                  : '30%',
    right                  : '30%',
    bottom                 : '20%',
    padding               :  20,
    margin                : 0  
  },
  modal : {

      padding: 0,
      margin: 0
  }
};


export default class Students extends Component {

    constructor(){
      super()
      this.state = {
          users: [],
          email:'',
          tempMail:'',
          showMessage:false,
          deletedUserID:'',
          isOpen:false         
      }      
  } 

  componentDidMount() {

console.log(this.props)

    AdminService.fetchStudents()
    .then(data => {     
        this.setState({ users:data.data })        
       
    }).catch(err => console.log(err))
       }

   handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }

  onSubmit = (e) => {
    e.preventDefault();   
      AdminService.mailNewUser(this.state.email)    
      this.setState({email:'',showMessage:true,tempMail:this.state.email}) 
      setTimeout(()=> { 
        this.setState({showMessage:false})
       }, 2000);
  }

  deleteUser = (userID) => {
    this.setState({isOpen:false})
    AdminService.deleteUser(userID)
    .then(students => {
      console.log(students)
      this.setState({users:students.data})
    }
      )
      }

  showModal = () => {
       
        this.setState({isOpen:true})
       
        }
        
hideModal = () => {

        this.setState({isOpen:false})
        
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

{this.state.showMessage && <div className="notification is-success"> An invitation has been send to {this.state.tempMail}</div>}

</div></div></div>

<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
        <th>Profile picture</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Telephone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>

          {this.state.users.map((user,index) =>    
         
         <tr key={index}>
            <td><span className='student-profile-small'><img src={user.image} alt={user.name}></img></span></td>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.username}</td>
          <td>{user.number}</td>
          

          <Modal isOpen={this.state.isOpen} onRequestClose={()=> this.hideModal()}  style={customStyles}>
<div className='modal-message'>
<div className='modal-header-message'><p className="modal-card-title">Delete user</p>
<button onClick={() => this.hideModal()} className='delete'>close</button>
</div> 
<div className='modal-body-message'>

<p></p>
</div>
<p>
Are you sure you want to delete {user.username}?</p><p></p><br></br>
<div className='modal-footer-message' >
  
<button className='button is-info' onClick={(e) => this.deleteUser(user._id) }>Delete user</button>

<button className='button is-danger is-small' onClick={() => this.hideModal()}>Close modal</button>
</div>


</div>
</Modal>

                    
          <td onClick={()=> this.showModal()}><IconContext.Provider  value={{className: "delete-icon" }}>  <FaRegTrashAlt /></IconContext.Provider></td>
        </tr>


         )}
              </tbody>
    </table>
      </div>
    )
  }
  }