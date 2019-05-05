import qs from 'querystringify';

export function configureFakeBackend() {
    let users = [{ id: 1, email: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                let splitUrl = url.split("?");
                let params = {};
                let baseUrl = "";

                if (splitUrl.length > 0) {
                    baseUrl = splitUrl[0];
                }

                if (splitUrl.length > 1) {
                    params = qs.parse(splitUrl[1], { ignoreQueryPrefix: true, decoder: function (x) { return } })
                }

                // authenticate
                if (baseUrl.endsWith('/account/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.email === params.email && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // register user
                if (baseUrl.endsWith('/account/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
                    if (duplicateUser) {
                        reject('Username "' + newUser.email + '" is already taken');
                        return;
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // confirm email
                if (baseUrl.endsWith('/account/confirmemail') && opts.method === 'Get') {
                    if(typeof params.code === "undefined" || typeof  params.id === "undefined"){
                        reject("Missing Code or ID");
                        return;
                    }

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });
                    return;
                }

                // update user
                if (baseUrl.endsWith('/account') && opts.method === 'PATCH') {
                    // get new user object from post body

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // get users
                if (baseUrl.endsWith('/account') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}