import { apiServiceWithAuth } from "./apiService";

function logout(to, from, next) {
  apiServiceWithAuth.post('/api/user/logout')
  .then(() => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user-data');
    next({name: 'login'});
  })
  .catch(err => console.log(err));
}

export { logout }