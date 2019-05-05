import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { CardSimple } from '../../_components/CardSimple'

import { userActions } from '../../_actions';
import { paths } from '../../_constants';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },

    },
});


class Account extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;

        this.handleMyProfileClick = this.handleMyProfileClick.bind(this);
    }

    componentDidMount() {
    }


    handleMyProfileClick(event) {
        let path = paths.PROFILE;
        this.props.history.push(path);
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid className={classes.root} container spacing={8}>
                <Grid item sm={6} xs={12}>
                    <CardSimple
                        title='My Profile'
                        content='Make sure to keep all your personal info up to date.'
                        buttonName='Got to Profile'
                        onButtonActionClick={this.handleMyProfileClick} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <CardSimple title='Test' subtitle='subtitle' content='test' />
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

let connectedApp = compose(
    withStyles(styles, { name: 'Account' }),
    connect(mapStateToProps, null)
)(Account);

export { connectedApp as Account }; 