// User Authentication 
function userAuth(to, from, next) {
    const accessToken = localStorage.getItem('access-token');
    if(accessToken) {
      next();
    } else {
      next({name: 'login'});
    }
}

function adminAuth(to, from, next) {
    if(localStorage.getItem('user-data')) {
        let user = JSON.parse(localStorage.getItem('user-data'));
        if(user.role === 'admin') {
            next()
        }
    }
}

// preventing login and register route 
function preventRepeatAuth(to, from, next) {
  !localStorage.getItem('access-token') ? next() : next({name: 'menu'})
}


export { userAuth, adminAuth, preventRepeatAuth }