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

function formatDate(pickedDate) {
    if(pickedDate!=null) {
        let localDate = new Date(pickedDate.getTime() - pickedDate.getTimezoneOffset() * 60 * 1000);
        let formattedDate = pickedDate != null ? localDate.toISOString('YYYY-MM-DD').slice(0,10) : null
        return formattedDate;
    } else {
        return null;
    }
}


export { emailValidate, storeAuthInfo, formatDate }