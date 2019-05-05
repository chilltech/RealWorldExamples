import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { paths } from '../_constants';
import { userLocalDb } from '../_storelocal';
import { userService } from '../_services';

import { history } from '../_helpers';

/** Layouts **/
import LayoutAuth from "../_layouts/LayoutAuth";
import LayoutDashboard from "../_layouts/LayoutDashboard";

export const checkAuth = {
    isAuthenticated: false,
    authenticate() {
        userService.userAuth().then(isAuth => {
            this.isAuthenticated = isAuth;
        });
    },
    auth() {
        userService.userAuth().then(isAuth => {
            return isAuth;
        });
    },
    signout() {
        this.isAuthenticated = false;
        userService.logout();
        this.isAuthenticated = false;
        history.push(paths.LOGIN);
    }
};

export const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <LayoutAuth>
            <Component {...props} />
        </LayoutAuth>
    )} />
)

export const DashboardRoute = ({ component: Component, authentication, ...rest }) => (
    <Route {...rest} render={props => (
        userLocalDb.getTokenSync() ?
            <LayoutDashboard>
                <Component authentication={authentication}  {...props} />
            </LayoutDashboard>
            : <Redirect to={{ pathname: paths.LOGIN, state: { from: props.location } }} />
    )} />
)