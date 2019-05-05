import config from 'config';
import { accountApi } from '../_api';
import { userLocalDb } from '../_storelocal';
import qs from 'querystringify';

export const userService = {
    get,
    userAuth,
    login,
    loginToken,
    update,
    logout,
    register,
    confirmEmail,
    confirmExtern,
    changePassword
};

function login(username, password) {
    return accountApi.login(username, password)
        .then(user => {
            if (user.token) {
                loginToken(user.token);
            }
            return user;
        });
}

function loginToken(token) {
    return userLocalDb.insertToken(token);
}

function logout() {
    userLocalDb.delete();
    userLocalDb.deleteToken();
}

function get() {
    return userLocalDb.get()
        .then(user => {
            if (user) {
                return user;
            }

            return accountApi.getUserInfo()
                .then(user => {
                    if (user) {
                        let userData = {
                            Username: user.username || "",
                            FirstName: user.firstname || "",
                            LastName: user.lastname || "",
                            Email: user.email || "",
                        }
                        userLocalDb.insert(userData);
                    }
                    return user;
                });
        });
}

async function userAuth() {
    let token = await userLocalDb.getToken();
    return (token !== null && typeof token !== "undefined" && token.length > 0)
}

function update(user) {
    let updateData = {};

    if (user.Username && user.Username.length > 0) {
        updateData.Username = user.Username
    }

    if (user.FirstName && user.FirstName.length > 0) {
        updateData.FirstName = user.FirstName
    }

    if (user.LastName && user.LastName.length > 0) {
        updateData.LastName = user.LastName
    }

    if (user.Email && user.Email.length > 0) {
        updateData.Email = user.Email
    }

    return accountApi.update(updateData)
        .then(succeeded => {
            userLocalDb.update(updateData);
            return succeeded;
        });
}

function changePassword(passwordChange) {
    let data = {
    };

    if (passwordChange.conPassword && passwordChange.conPassword.length > 0) {
        data.ConfirmPassword = passwordChange.conPassword
    }
    if (passwordChange.oldPassword && passwordChange.oldPassword.length > 0) {
        data.OldPassword = passwordChange.oldPassword
    }
    if (passwordChange.newPassword && passwordChange.newPassword.length > 0) {
        data.Newpassword = passwordChange.newPassword
    }

    return accountApi.chgPassword(data);
}

function register(user) {
    return accountApi.register(user);
}

function confirmEmail(confirm) {
    let query = qs.stringify(confirm);
    return accountApi.confirmemail(query);
}

function confirmExtern() {
    return accountApi.confirmExtern();
}