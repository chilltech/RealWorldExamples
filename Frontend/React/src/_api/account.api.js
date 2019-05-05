
import config from 'config';
import { handleResponse, buildRequestOptions, handleError } from './apibase';
import { RequestTypes } from '../_constants';

export const accountApi = {
    login,
    loginExter,
    update,
    register,
    getUserInfo,
    chgPassword,
    confirmemail,
    confirmExtern
};

const baseAccApiUrl = `${config.apiUrl}/account`;
const getUserApiUrl = `${baseAccApiUrl}/userinfo`;
const conEmailApiUrl = `${baseAccApiUrl}/confirmemail`;
const conExternApiUrl = `${baseAccApiUrl}/externalloginconfirm`;
const chgPassApiUrl = `${baseAccApiUrl}/chgpassword`;
const authApiUrl = `${baseAccApiUrl}/authenticate`;
const registerApiUrl = `${baseAccApiUrl}/register`;
const connectApiUrl = `${baseAccApiUrl}/connect`;

const baseManApiUrl = `${config.apiUrl}/manage`;
const upadateApiUrl = `${baseManApiUrl}/update`;


async function login(username, password) {
    let requestOptions = await buildRequestOptions({
        Method: RequestTypes.POST,
        Body: JSON.stringify({
            "email": username,
            "password": password
        })
    });

    return fetch(authApiUrl, requestOptions)
        .then(handleResponse)
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(handleError);
}

async function loginExter(provider) {
    let requestOptions = await buildRequestOptions({
        Method: RequestTypes.GET
    });

    return fetch(`${connectApiUrl}?provider=${provider}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(handleError);
}

async function register(bodyData) {
    let requestOptions = await buildRequestOptions({
        addAuth: true,
        Method: RequestTypes.POST
    });

    return fetch(registerApiUrl, requestOptions)
        .then(handleResponse)
        .catch(handleError);
}

async function update(bodyData) {
    let requestOptions = await buildRequestOptions({
        addAuth: true,
        Method: RequestTypes.PATCH,
        Body: JSON.stringify(bodyData)
    });

    return fetch(upadateApiUrl, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response.succeeded;
        })
        .catch(handleError);
}

async function confirmemail(getParams) {
    let requestOptions = await buildRequestOptions({
        addAuth: true,
        Method: RequestTypes.GET
    });
    return fetch(`${conEmailApiUrl}?${getParams}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);
}

async function confirmExtern() {
    let requestOptions = await buildRequestOptions({
        addAuth: true,
        Method: RequestTypes.GET
    });

    return fetch(`${conExternApiUrl}`, requestOptions)
        .then(handleResponse)
        .catch(handleError);
}

async function chgPassword(bodyData) {
    let requestOptions = await buildRequestOptions({
        addAuth: true,
        Method: RequestTypes.POST,
        Body: JSON.stringify(bodyData)
    });

    return fetch(chgPassApiUrl, requestOptions)
        .then(handleResponse)
        .catch(handleError);
}

async function getUserInfo() {
    let requestOptions = await buildRequestOptions({
        addAuth: true,
        Method: RequestTypes.GET
    });

    return fetch(getUserApiUrl, requestOptions)
        .then(handleResponse)
        .then(user => {
            return Promise.resolve(user);
        })
        .catch(handleError);
}