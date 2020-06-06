import axios from 'axios'


const URL = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/admin`,
  })

  const UserService = {
   
    FetchVideosStudent: (user) => {
      return URL.post('/videos-student',user)
    }

  }




export default UserService