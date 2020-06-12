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
      return URL.post('/students-video',videoID)
    },
    tagVideo: (data) => {    
      return URL.post('/tagvideo',data)
    },
    untagVideo: (data) => {    
      return URL.post('/untagvideo',data)
    },    
    mailNewUser: (email) => {
      return URL.post('/mail-user',{email:email})
    },
    sendNotifications: (data) => {
      console.log(data)
      return URL.post('/send-notification',data)
    }

  }




export default AdminService