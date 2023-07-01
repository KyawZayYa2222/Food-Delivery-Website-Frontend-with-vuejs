function emailValidate(email) {
    let emailErr = null;
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        emailErr = null
    } else {
        emailErr = 'Invalid email.'
    }
    
    return emailErr
}

function storeAuthInfo(userData, token) {
    let user = JSON.stringify(userData);
    localStorage.setItem('user-data', user);
    localStorage.setItem('access-token', token);
}


export { emailValidate, storeAuthInfo }