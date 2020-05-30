import React, {Component} from 'react';
import AdminService from '../services/admin-service'
import { Link } from 'react-router-dom';

export default class Videos extends Component {

    constructor(){
      super()
      this.state = {
          videos: [],
          
      }      
  }
   
componentDidMount() {
  AdminService.fetchVideos()
    .then(data => {
        this.setState({ videos:data.data })        
    }).catch(err => console.log(err))            
    }



    render() {
  
        
    return (
      <div >
          {this.state.videos.map((video,index) =>    
         <div key={video.id} >
         {video.snippet.title}<p></p>
         <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title}></img>
         <Link to={`/video/${video._id}`}>Tag students</Link>
         </div>        
         
         )}

      </div>
    )
            }
  }