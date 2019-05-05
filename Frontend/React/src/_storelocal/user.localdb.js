
export const userLocalDb = {
    insert,
    get,
    delete: deleteUser,
    update,
    getToken,
    insertToken,
    getTokenSync,
    deleteToken
}

function insert(user) {
    Promise.resolve(localStorage.setItem('user', JSON.stringify(user)));
}

function get() {
    return Promise.resolve(JSON.parse(localStorage.getItem('user')));
}

function update(user) {
    let current = JSON.parse(localStorage.getItem('user'));
    if (user.Username && user.Username.length > 0 && current.Username !== user.Username) {
        current.Username = user.Username
    }

    if (user.FirstName && user.FirstName.length > 0 && current.FirstName !== user.FirstName) {
        current.FirstName = user.FirstName
    }

    if (user.LastName && user.LastName.length > 0 && current.LastName !== user.LastName) {
        current.LastName = user.LastName
    }

    if (user.Email && user.Email.length > 0 && current.Email !== user.Email) {
        current.email = user.Email
    }

    insert(current);
}

function deleteUser() {
    Promise.resolve(localStorage.removeItem('user'));
}

function insertToken(token) {
    return Promise.resolve(localStorage.setItem('token', JSON.stringify(token)));
}

function getToken() {
    return Promise.resolve(getTokenSync());
}
function getTokenSync() {
    return JSON.parse(localStorage.getItem('token'));
}

function deleteToken() {
    Promise.resolve(localStorage.removeItem('token'));
}