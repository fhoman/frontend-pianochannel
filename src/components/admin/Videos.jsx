import React, {Component} from 'react';
import AdminService from '../../services/admin-service'
import { Link } from 'react-router-dom';

export default class Videos extends Component {

  state = {
          videos: [],
          totalVideos:0,
          loading:true
          
      }      
  
   
componentDidMount() {
  AdminService.fetchVideos()
    .then(data => {
      console.log(data.data)
        this.setState({ videos:data.data,totalVideos:data.data.length,loading:false })        
    }).catch(err => console.log(err))            
    }



    render() {
  if (this.state.loading) {

   return <p>Loading videos</p>

  }

        
    return (
<>




      <div className="box" >

<div className="columns">


<div className="column is-2-tablet is-4-mobile has-text-centered">
<p className="stat-val">{this.state.totalVideos}</p>
<p className="stat-key">Videos</p>



</div>
<div className="column is-8">
<p className="control has-addons">
<input className="input" placeholder="Search videos" type="text"></input>

</p>
</div>
</div>
</div>

<div className='video-container'>

{this.state.videos.map((video,index) => {
console.log(video)
return (
<div className="card-video" key={video.id}>

<div className="card-content">
<div className="content">
<p>{video.snippet.publishedAt}</p> 
<p className="title is-5">{video.snippet.title}</p>

<p></p>
{video.users.map((user,index)=> {

return <span className='student-profile-small'><img src={user.image} alt={user.name}></img></span>
}

)}
<p></p>
<Link to={`/video/${video._id}`} className='button is-info is-small'>Tag students</Link>
</div>
</div>
</div> 

)
})}
</div></>)

}
}