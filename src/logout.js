import axios from 'axios';
// Logout 
function logout(to, from, next) {
    const token = localStorage.getItem('access-token');
      let config = { headers : {'Authorization' : `Bearer ${token}`} };
      let data = {};
      
      axios.post('http://127.0.0.1:8000/api/logout', data, config)
      .then(() => {
        localStorage.removeItem('access-token');
        localStorage.removeItem('user-data');
        next({name: 'login'});
      })
      .catch(error => {
        console.log(error)
      });
}

export { logout }