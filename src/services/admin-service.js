import axios from 'axios'


const URL = axios.create({

    baseURL: `${process.env.REACT_APP_API_URL}/admin` ,
  })

  const AdminService = {
    fetchVideos: () => {
      return URL.post('/videos')
    },
    fetchVideo:  (videoID) => { 
      return URL.post('/video',videoID)
    },
    fetchStudents: () => {
      return URL.post('/students')
    },
    fetchStudentsVideo: (videoID) => {
      console.log(videoID)
      return URL.post('/students-video',videoID)
    },
    addStudent: (user) => {
      console.log(user)
      return URL.post('/add-student',user)
    },
    tagVideo: (data) => {
      console.log(data)
      return URL.post('/tagvideo',data)
    },
    untagVideo: (data) => {
      console.log(data)
      return URL.post('/untagvideo',data)
    },    
    mailNewUser: (email) => {
      return URL.post('/mail-user',email)
    }

  }




export default AdminService