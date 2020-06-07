import React, { Component } from 'react'
import UserService from '../../services/user-service'
// import { Link } from 'react-router-dom';
import "bulma/css/bulma.css"
import {Modal} from '../user/Modal'

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
        show: false,
        
            }
        

            showModal = () => {
              this.setState({ show: true });
            };
          
            hideModal = () => {
              this.setState({ show: false });
            };

            savePreferences = (e) => {
              e.preventDefault();

              this.setState({ show: false });
              UserService.UpdateProfileStudent(this.state)
              console.log(this.state.bio)
            };

            handleInput = (e) => {
              let {name, value} = e.target;
              this.setState({[name]: value})
              console.log(this.state.bio)
          }

componentDidMount() {

UserService.FetchProfileStudent({username:this.state.username})
.then(response => {

  const {name,surname,number,videos,bio,role,image} = response.data[0]

this.setState({videos,totalVideos:videos.length,name,surname,number,bio,role,image,
loading:false})         
          })
          
          }



    render() {
      const YouTubeURL = 'https://www.youtube.com/embed/'
        console.log(this.props)

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
          <p>
          <span className="title is-bold">{this.state.name} {this.state.surname}</span>
          <br></br>
          <Modal show={this.state.show} name={this.state.name} surname={this.state.surname} 
          number={this.state.number} username={this.state.username} description={this.state.bio} handleSave={this.savePreferences} 
          handleClose={this.hideModal} handleInput={this.handleInput}>        
        </Modal>
        <button type="button" className='button is-primary is-outlined' onClick={this.showModal}>
          Edit preferences
        </button>
          <br></br>
          </p>
          <p className="tagline">
          {this.state.bio}
          </p>
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
  <p>{video.snippet.publishedAt}</p>
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

