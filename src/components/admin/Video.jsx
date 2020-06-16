import React, { Component } from 'react'
import AdminService from '../../services/admin-service'
import '../../App.css';
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


export default class Video extends Component {

    constructor(props){
        super(props)
        this.state = {
            students: [],
            taggedVideo:'',
            taggedStudent:'',
            loading:true,
            isOpen:false,
            taggedStudentsArr:[]           
        }      
    }
    

getNewData() {
    AdminService.fetchVideo({videoID:this.props.match.params.id})
    .then(video => {
        this.setState({taggedVideo:video.data,loading:false})
        AdminService.fetchStudentsVideo({videoID:this.state.taggedVideo._id})
        .then(students => { 
        this.setState({students:students.data})
        })          
    })
}

componentDidMount() {    
this.getNewData()
}
    
tagUser = (student) => {    
const data = {username:student.username,
videoID:this.state.taggedVideo._id}
AdminService.tagVideo(data)
.then(() => {
    this.setState({taggedStudent:student})        
    // Create a new array based on current state:
let taggedStudentsArr = [...this.state.taggedStudentsArr];
// Add item to it
taggedStudentsArr.push(this.state.taggedStudent);
this.getNewData()      
this.setState({taggedStudentsArr})
}   )
.catch(err => console.log(err))
    }  


untagUser = (student) => {
    const data = {username:student.username,
        videoID:this.state.taggedVideo._id}
AdminService.untagVideo(data)
.then(() => {
    this.setState({taggedStudent:student})
    this.getNewData()  
}   )
.catch(err => console.log(err))
}


sendNotifications = () => {
    this.hideModal()
AdminService.sendNotifications({taggedStudentsArr:this.state.taggedStudentsArr,videoID:this.state.taggedVideo})
this.props.history.push('/videos');
}

showModal = () => {
if (this.state.taggedStudentsArr.length > 0){
this.setState({isOpen:true})
}
else {
this.props.history.push('/videos');
}
}

hideModal = () => {
this.setState({isOpen:false})
this.props.history.push('/videos');
}

    render() {
  
       
        if (this.state.loading) {
           
return <div>Loading</div>
        }

else{
    const {title} = this.state.taggedVideo.snippet
        return (
            <div className='card-video'>
<div className='card-content'>
    <div className='content'>
<h2 className='video-modal' >{title}</h2>
<p></p>

{this.state.taggedVideo.users.map((student,index) => {

return <div key={index}><span key={index} className='student-profile-small'> <img alt={student.username}  src={student.image}></img></span><button className="button is-danger is-small" onClick={(e) => this.untagUser(student)}>
<span >Untag student</span>

</button> </div>

})}
<p></p>

{this.state.students.map((student,index) => {

return <div key={index}><span key={index} className='student-profile-small mr-6'> <img alt={student.username}  src={student.image}></img></span> <button className='button is-success is-small' onClick={(e) => this.tagUser(student)}>Tag user</button></div>

})}
<p></p>

<Modal isOpen={this.state.isOpen} onRequestClose={()=> this.hideModal()}  style={customStyles}>
<div className='modal-message'>
<div className='modal-header-message'><p className="modal-card-title">Send notifications</p>
<button onClick={() => this.hideModal()} className='delete'>close</button>
</div> 
<div className='modal-body-message'>
<ul>
{this.state.taggedStudentsArr.map(student => {
console.log(student)
return <li><span key={student.username} className='student-profile-small'> <img alt={student.username}  src={student.image}></img></span> {student.name}</li>

})}
</ul>
<p></p>
</div>


<div className='modal-footer-message' >
<button className='button is-info' onClick={()=> this.sendNotifications()}>Send notifications</button>

<button className='button is-danger is-small' onClick={() => this.hideModal()}>Close modal</button>
</div>


</div>
</Modal>
<button onClick={()=> this.showModal()} className='button is-info'>Back to videos</button>

</div></div>
            </div>
        )
    }
}
}