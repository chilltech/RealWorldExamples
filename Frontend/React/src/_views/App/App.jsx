import React from 'react';
import compose from 'recompose/compose';

import { Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { paths } from '../../_constants';

import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { AuthRoute, DashboardRoute, checkAuth } from '../../_components/Routes';

import { Account, ChangePassword, Profile } from '../Account';
import { Login, Register, ConfirmEmail, ConfirmExternal } from '../Auth';
import { Dashboard } from '../Dashboard';


class App extends React.Component {

    constructor(props) {
        super(props);
        const { dispatch } = this.props;

        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });

    }
    componentDidMount() {
        checkAuth.authenticate(() => { });
    }

    render() {

        const { alert } = this.props;
        const reload = () => window.location.reload();

        return (
            <Router history={history}>
                <Switch>
                    <DashboardRoute exact path={paths.ROOT} component={Dashboard} />
                    <DashboardRoute exact path={paths.ACCOUNT} component={Account} />
                    <DashboardRoute exact path={paths.PROFILE} component={Profile} />
                    <DashboardRoute exact path={paths.CHGPASSWORD} component={ChangePassword} />
                    <AuthRoute path={paths.LOGIN} component={Login} />
                    <AuthRoute path={paths.CONFIRMEMAIL} component={ConfirmEmail} />
                    <AuthRoute path={paths.CONFIRMEXTERNAL} component={ConfirmExternal} />
                    <AuthRoute path={paths.REGISTER} component={Register} />
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert, navOpen, authentication} = state;
    return {
        alert,
        navOpen,
        authentication,
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 