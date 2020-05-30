import axios from 'axios'

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    })
  
  }

  signup = (username, password,campus,course) => {
    return this.service.post('/auth/signup', {username, password,campus,course})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
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