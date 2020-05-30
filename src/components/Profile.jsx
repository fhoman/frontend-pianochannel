import React, { Component } from 'react'
import UserService from '../services/user-service'
// import { Link } from 'react-router-dom';

export default class Profile extends Component {

state = {username:'fhoman@gmail.com',
         videos:[],
         loading:true}

componentDidMount() {
UserService.FetchVideosStudent({UserID:this.state.username})
.then(response => {
console.log(response.data)
this.setState({videos:response.data[0].videos,
loading:false})

})

}
    render() {

const YouTubeURL = 'https://www.youtube.com/embed/'
   
if (this.state.loading) {

 return   <div>Loading</div>

}

        return (
            <div>
              <h3>Student profile </h3>  

{this.state.username}

{this.state.videos.map((video,index) => {

return <div key={index}>{video.snippet.title} 
<p></p>
<iframe title={index} width="560" height="315" src={YouTubeURL+video.snippet.resourceId.videoId} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


})}

            </div>
        )
       }   }

