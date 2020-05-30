import React, { Component } from 'react'
import AdminService from '../services/admin-service'
import { Link } from 'react-router-dom';

export default class Video extends Component {

    constructor(){
        super()
        this.state = {
            students: [],
            taggedVideo:'',
            taggedStudent:'',
            loading:true            
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
this.getNewData()      
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

    render() {
       
       
        if (this.state.loading) {
           
return <div>Loading</div>
        }

else{
    const {title} = this.state.taggedVideo.snippet
        return (
            <div>

{title}
<p></p>
<h3>Tagged users</h3>
{this.state.taggedVideo.users.map((student,index) => {

return <div key={index}>{student.username} <button onClick={(e) => this.untagUser(student.username)}>Untag student</button> </div>

})}
<p></p>
<h3>Untagged users </h3>
{this.state.students.map((student,index) => {

return <div key={index}>{student.username} <button onClick={(e) => this.tagUser(student.username)}>Tag user</button></div>

})}
<p></p>
<Link to='/videos'>Back to videos</Link>
                
            </div>
        )
    }
}
}