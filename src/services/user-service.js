import axios from 'axios'


const URL = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/user`,
  })

  const UserService = {
       
    FetchProfileStudent: (user) => {
      return URL.post('/profile-student',user)
    },
    UpdateProfileStudent: (user) => {
      return URL.post('/update-profile-student',user)
    },
    handleFileUpload: (image) => {
      return URL.post('/profileimage', image)      
        .then(response => response.data)
    }
  }




export default UserService