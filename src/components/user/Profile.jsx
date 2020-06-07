import React, { Component } from 'react'
import UserService from '../../services/user-service'
// import { Link } from 'react-router-dom';
import "bulma/css/bulma.css"

export default class Profile extends Component {

state = {username:this.props.user,
         loading:true,
         role:'',
         videos:[],
        totalVideos:0,
        name:'',
        surname:'',
        bio:'',
        image:''
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



          <div className="modal" id="edit-preferences-modal">
          <div className="modal-background"></div>
          <div className="modal-card">
          <header className="modal-card-head">
          <p className="modal-card-title">Edit Preferences</p>
          <button className="delete"></button>
          </header>
          <section className="modal-card-body">
          <label className="label">Name</label>
          <p className="control">
          <input className="input" placeholder="Text input" type="text"></input>
          </p>
          <label className="label">Username</label>
          <p className="control has-icon has-icon-right">
          <input className="input" placeholder="Text input" type="text" value="pmillerk"></input>
          </p>
          <label className="label">Email</label>
          <p className="control has-icon has-icon-right">
          <input className="input" placeholder="Email input" type="text" value="hello@"></input>
          <i className="fa fa-warning"></i>
          <span className="help is-danger">This email is invalid</span>
          </p>
          <div className="control">
          <div className="control-label is-pulled-left">
          <label className="label">Date of Birth</label>
          </div>
          <span>
          <span className="select">
          <select>
          <option>Month</option>
          <option>With options</option>
          </select>
          </span>
          <span className="select">
          <select>
          <option>Day</option>
          <option>With options</option>
          </select>
          </span>
          <span className="select">
          <select>
          <option>Year</option>
          <option>With options</option>
          </select>
          </span>
          </span>
          </div>
          <label className="label">Description</label>
          <p className="control">
          <textarea className="textarea" placeholder="Describe Yourself!"></textarea>
          </p>
          <div className="content">
          <h1>Optional Information</h1>
          </div>
          <label className="label">Phone Number</label>
          <p className="control has-icon has-icon-right">
          <input className="input" placeholder="Text input" type="text" value="+1 *** *** 0535"></input>
          </p>
           <label className="label">Work</label>
          <p className="control has-icon has-icon-right">
          <input className="input" placeholder="Text input" type="text" value="Greater Washington Publishing"></input>
          </p>
          <label className="label">School</label>
          <p className="control has-icon has-icon-right">
          <input className="input" placeholder="Text input" type="text" value="George Mason University"></input>
          </p>
          </section>
          <footer className="modal-card-foot">
          <a className="button is-primary modal-save" href='/save'>Save changes</a>
          <a className="button modal-cancel" href='/save'>Cancel</a>
          </footer>
          </div>


          </div>
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
          <a className="button is-primary is-outlined" href="/save" id="edit-preferences" >
          Edit Preferences
          </a>
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
console.log(video)
return (



<div className="card-video" key={video.id}>
<div className="card-image">
<iframe title={index} width="300" height="215" src={YouTubeURL+video.snippet.resourceId.videoId} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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

