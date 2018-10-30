import api from '../api';

const authenticate = () => {
  return dispatch => {
    api.post('/sessions/refresh')
    .then((res) => {

    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('token');
      window.location = '/login';
    });
  }
}

export default authenticate;
