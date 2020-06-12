import React, { Component } from 'react'
import AdminService from '../../services/admin-service'
import {} from 'react-router-dom';

export default class ModalVideo extends Component {

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


return (
          <>
          <div className="modal-background"></div>
          <div className="modal-card">
          <header className="modal-card-head">
          <p className="modal-card-title">Edit Preferences</p>
          <button onClick={this.props.handleClose()} className='delete'>close</button>
          </header>
          <section className="modal-card-body">
       test
          </section>
          <footer className="modal-card-foot">
          <a className="button is-primary modal-save" href='/save' onClick={(e) => this.props.handleSave(e)}>Save changes</a>
          <button onClick={this.props.handleClose()}>close</button>
          </footer>
          </div>
             
            </>
        )
    
}
}