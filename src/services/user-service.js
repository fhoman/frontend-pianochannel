import axios from 'axios'


const URL = axios.create({
    baseURL: 'http://localhost:5000/api/profile',
  })

  const UserService = {
   
    FetchVideosStudent: (user) => {
      return URL.post('/videos-student',user)
    }

  }




export default UserService