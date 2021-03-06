import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/users/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    console.log("===user===",user)
    return axios.post(API_URL + '/users', {
      name: user.name,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();
