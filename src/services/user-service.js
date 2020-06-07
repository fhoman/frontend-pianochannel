import axios from 'axios'


const URL = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/user`,
  })

  const UserService = {
   
    FetchVideosStudent: (user) => {
      return URL.post('/videos-student',user)
    },
    FetchProfileStudent: (user) => {
      return URL.post('/profile-student',user)
    },
    UpdateProfileStudent: (user) => {
      return URL.post('/update-profile-student',user)
    }

  }




export default UserService