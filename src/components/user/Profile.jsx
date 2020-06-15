import React, { Component } from 'react'
import UserService from '../../services/user-service'
// import { Link } from 'react-router-dom';
import "bulma/css/bulma.css"
import {Modal} from '../user/Modal'
import Moment from 'react-moment';

export default class Profile extends Component {

state = {username:this.props.user,
         loading:true,
         role:'',
         videos:[],
        totalVideos:0,
        name:'',
        surname:'',
        bio:'',
        image:'',
        number:'',
        show: false,
        flagButton: true
        
            }
            
            
showModal = () => {
this.setState({ show: true,flagButton:false });
};
          
hideModal = () => {
this.setState({ show: false,flagButton:true });
};

savePreferences = (e) => {
e.preventDefault();
this.setState({ show: false,flagButton:true });
UserService.UpdateProfileStudent(this.state)
};

handleInput = (e) => {
console.log(e.target)
let {name, value} = e.target;
if (e.target.type === 'checkbox') {
value = e.target.checked
}          
this.setState({[name]: value})
}

handleFileUpload = e => {
const uploadData = new FormData(); 
uploadData.append("image", e.target.files[0]);
uploadData.append("username", this.state.username);       
UserService.handleFileUpload(uploadData)
.then(response => {
     
                this.setState({ image: response });
              })
  .catch(err => {
                console.log("Error while uploading the file: ", err);
              });
        }

componentDidMount() {

UserService.FetchProfileStudent({username:this.state.username})
.then(response => {

  const {name,surname,number,videos,bio,role,image,emailnotifications,whatsappnotifications} = response.data[0]

this.setState({videos,totalVideos:videos.length,name,surname,number,bio,role,image,emailnotifications,whatsappnotifications,
loading:false})         
          })
          
          }

    render() {
     
      const YouTubeURL = 'https://www.youtube.com/embed/'
     
        return (
          <div className="container profile">
          <div className="section profile-heading">
          <div className="columns is-mobile is-multiline">
          <div className="column is-2">
          <span className="student-profile-big">
          <img alt={this.state.name} src={this.state.image}></img>
          </span>
          </div>
          <div className="column is-4-tablet is-10-mobile name">
        
          <span className="title is-bold">{this.state.name} {this.state.surname}</span>
          <br></br>
          <Modal user={this.state} handleSave={this.savePreferences} 
          handleClose={this.hideModal} handleInput={this.handleInput} handleFileUpload={this.handleFileUpload}>        
        </Modal>
        {this.state.flagButton &&  <button type="button"  className='button is-primary is-outlined' onClick={this.showModal}>Edit preferences</button>}
          <br></br>
        
          <p className="tagline">{this.state.bio}</p>
          </div>
          <div className="column is-2-tablet is-4-mobile has-text-centered">
          <p className="stat-val">{this.state.totalVideos}</p>
          <p className="stat-key">videos</p>
          </div>
          
          </div>
          </div>

<div className='video-container'>

  {this.state.videos.map((video,index) => {

return (

<div className="card-video" key={video.id}>
<div className="card-image">
<iframe allowtransparency="true" title={index} width="300" height="215" src={YouTubeURL+video.snippet.resourceId.videoId} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
</div>
<div className="card-content">
<div className="content">
<p><Moment format="D MMM YYYY">{video.snippet.publishedAt}</Moment></p> 
  <p className="title is-5">{video.snippet.title}</p>
<p>{video.snippet.description}</p>
</div>
</div>
</div> 
)
  })}
</div>
          </div>
        )
       }   }

