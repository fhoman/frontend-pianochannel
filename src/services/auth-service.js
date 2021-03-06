import axios from 'axios'

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/`,
      withCredentials: true
    })
  
  }

  signup = (username, password) => {
    
    return this.service.post('/auth/signup', {username, password})
    .then(response => {
      console.log(response)
     return response}
     )
      }

  login = (username, password) => {
     return this.service.post('/auth/login', {username, password})
    .then(response => { 
      return response.data}
      )
  }

  isAuthenticated = () => {
    return this.service.get('/auth/isLoggedIn')
    .then(response => response.data)
  }

  logOut = () => {
    return this.service.post('/auth/logout')
    .then(response => response.data)
  }

}

export default AuthService