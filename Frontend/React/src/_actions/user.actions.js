import { userConstants, paths } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { checkAuth } from '../_components';

export const userActions = {
    login,
    saveToken,
    logout,
    register,
    confirmEmail,
    confirmExtern,
    update,
    changePassword,
    getAll,
    get
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(paths.ROOT);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function saveToken(token) {
    return dispatch => {
        userService.loginToken(token)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    checkAuth.signout(() => { });
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push(paths.LOGIN);
                    dispatch(alertActions.success('Registration successful, Please confirm email address, before logging in.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function confirmEmail(confirm) {
    return dispatch => {
        dispatch(request(confirm));

        userService.confirmEmail(confirm)
            .then(
                confirm => {
                    dispatch(success());
                    history.push(paths.LOGIN);
                    dispatch(alertActions.success('Confirmation successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function confirmExtern() {
    return dispatch => {
        dispatch(request());

        userService.confirmExtern()
            .then(
                user => {
                    dispatch(success(user));
                    checkAuth.authenticate(() => { });
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(user) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function changePassword(user) {
    return dispatch => {
        dispatch(request(user));

        userService.changePassword(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('password change successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function get() {
    return dispatch => {
        dispatch(request());
        userService.get()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(user) { return { type: userConstants.GET_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_FAILURE, error } }
}