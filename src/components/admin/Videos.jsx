import React, {Component} from 'react';
import AdminService from '../../services/admin-service'
import { Link } from 'react-router-dom';

export default class Videos extends Component {

  state = {
          videos: [],
         
          loading:true
          
      }      
  
   
componentDidMount() {
  AdminService.fetchVideos()
    .then(data => {
      console.log(data.data)
        this.setState({ videos:data.data,loading:false })        
    }).catch(err => console.log(err))            
    }



    render() {
  if (this.state.loading) {

   return <p>Loading videos</p>

  }

        
    return (


<div className='video-container'>

{this.state.videos.map((video,index) => {
console.log(video)
return (
<div className="card-video" key={video.id}>

<div className="card-content">
<div className="content">
<p>{video.snippet.publishedAt}</p>
<span className="tag is-dark subtitle">{video.snippet.title}</span>
<p></p>
{video.users.map((user,index)=> {

return <span className='student-profile-small'><img src={user.image} alt={user.name}></img></span>
}

)}
<p></p>
<Link to={`/video/${video._id}`}>Tag students</Link>
</div>
</div>
</div> 

)
})}
</div>)

}
}