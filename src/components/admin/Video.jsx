import React, { Component } from 'react'
import AdminService from '../../services/admin-service'
import { Link } from 'react-router-dom';
import '../../App.css';


export default class Video extends Component {

    constructor(){
        super()
        this.state = {
            students: [],
            taggedVideo:'',
            taggedStudent:'',
            loading:true,
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
    
tagUser = (username) => {    

const data = {username:username,
videoID:this.state.taggedVideo._id}

AdminService.tagVideo(data)
.then(() => {
    this.setState({taggedStudent:username})        
    // Create a new array based on current state:
let taggedStudentsArr = [...this.state.taggedStudentsArr];
// Add item to it
taggedStudentsArr.push(this.state.taggedStudent);
this.getNewData()      
this.setState({taggedStudentsArr})
}   )
.catch(err => console.log(err))
    }  



untagUser = (username) => {
    const data = {username:username,
        videoID:this.state.taggedVideo._id}
AdminService.untagVideo(data)
.then(() => {
    this.setState({taggedStudent:username})

    this.getNewData()  
}   )
.catch(err => console.log(err))
}


sendNotifications = () => {
AdminService.sendNotifications({taggedStudentsArr:this.state.taggedStudentsArr,videoID:this.state.taggedVideo})
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

return <div key={index}><span key={index} className='student-profile-small'> <img alt={student.username}  src={student.image}></img></span><button className="button is-danger is-small ml-6" onClick={(e) => this.untagUser(student.username)}>
<span >Untag student</span>
<span className="icon is-small">
  <i className="delete"></i>
</span>
</button> </div>

})}
<p></p>

{this.state.students.map((student,index) => {

return <div key={index}><span key={index} className='student-profile-small mr-6'> <img alt={student.username}  src={student.image}></img></span> <button className='button is-success is-small' onClick={(e) => this.tagUser(student.username)}>Tag user</button></div>

})}
<p></p>
<Link to='/videos'   onClick={()=> this.sendNotifications()}>Back to videos</Link>
</div></div>
            </div>
        )
    }
}
}