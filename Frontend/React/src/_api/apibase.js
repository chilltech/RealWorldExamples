

import { userLocalDb } from '../_storelocal';
import { RequestTypes } from '../_constants';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                return Promise.reject("Unathorized. If logged in, please try logging out, then back in.");
            }

            const error = (data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function handleError(error) {
    return Promise.reject(error.message);
}

export async function buildRequestOptions(params) {

    if (params === null || typeof params === "undefined") {
        params = {
            addAuth: false,
            Method: RequestTypes.POST
        };
    }

    let headers = {
        'Content-Type': 'application/json'
    };

    if (params.addAuth) {
        let token = await userLocalDb.getToken();

        if (typeof token !== "undefined" && token.length > 0) {
            headers.Authorization = 'Bearer ' + token;
        }
    }

    let requestOptions = {
        method: params.Method,
        headers: headers,
    };

    if (typeof params.Body !== "undefined" && params.Body.length > 0) {
        requestOptions.body = params.Body;
    }

    return requestOptions;
}