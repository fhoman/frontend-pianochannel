import React, {Component} from 'react';
import AdminService from '../../services/admin-service'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default class Videos extends Component {

  state = {
          videos: [],
          filteredData: [],
          totalVideos:0,
          taggedVideo:'',
          taggedStudent:'',
          loading:true,
          searchValue:'',
          showVideoCardModal:''          
      }      


showModal = () => {
        this.setState({ showVideoCardModal: true });
      };
    
hideModal = () => {
        this.setState({ showVideoCardModal: false });
      };
  
getNewData() {
    AdminService.fetchVideos()
    .then(data => {
      console.log(data.data)
        this.setState({ videos:data.data,filteredData:data.data,totalVideos:data.data.length,loading:false })        
    }).catch(err => console.log(err))     
    }
   
componentDidMount() {
  AdminService.fetchVideos()
    .then(data => {
      console.log(data.data)
        this.setState({ videos:data.data,filteredData:data.data,totalVideos:data.data.length,loading:false })        
    }).catch(err => console.log(err))            
    }

inputSearchHandler = (searchValue) => {
  console.log(searchValue)
      const searchedFoods = this.state.videos.filter((video) => {
        return video.snippet.title.toLowerCase().includes(searchValue);
      });
      console.log(searchedFoods)
    this.setState({searchValue:searchValue,
      filteredData:searchedFoods})
    }

untagUser = (videoID,username) => {
console.log(username,videoID)
      const data = {username:username,
          videoID:videoID}
  AdminService.untagVideo(data)
  .then(() => {
      this.setState({taggedStudent:username})
      this.getNewData()  
  }   )
  .catch(err => console.log(err))
  }


    render() {
  if (this.state.loading) {

   return <p className='columns is-centered' >Loading videos</p>

  }

  if (this.state.filteredData.length === 0) {


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
      <input className="input" placeholder="Search videos" onChange={(e) => this.inputSearchHandler(e.target.value)}  value={this.searchValue} type="text"></input>
            </p>
      </div>     </div>        
       </div>
<p className='columns is-centered'>There are no results</p><p></p>
</>
    )

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
<input className="input" placeholder="Search videos" onChange={(e) => this.inputSearchHandler(e.target.value)}  value={this.searchValue} type="text"></input>
</p>
</div>
</div>
</div>

<div className='video-container'>

{this.state.filteredData.map((video,index) => {

return (
<div className="card-video" key={video.id}>
<div className="card-content">
<div className="content">
<p><Moment format="D MMM YYYY">{video.snippet.publishedAt}</Moment></p> 
<p className="title is-5">{video.snippet.title}</p>
<p></p>
{video.users.map((user,index)=> {

return <span key={index} className='student-profile-small'><img src={user.image}  alt={user.name}></img></span>
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