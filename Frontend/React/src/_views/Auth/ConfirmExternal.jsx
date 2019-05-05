import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userActions } from '../../_actions';

const styles = theme => ({
    container: {
        'padding-top': '48px'
    },
    circlecont: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100px'
    },
    header: {
        'text-align': 'center'
    }
});

class ConfirmExternal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirm: {
                code: '',
                userId: ''
            },
            errors: {},
            submitted: false
        };
    }
    componentDidMount() {
        this.props.dispatch(userActions.confirmExtern());
    }
    render() {
        const { ConfirmExternaling, classes } = this.props;
        const { user, errors, submitted } = this.state;
        return (
            <React.Fragment>
                <Typography className={classes.header} variant="h5">Confirming Provider</Typography>
                <Typography className={classes.header} variant="subtitle2" gutterBottom>
                    Please wait while we confirm your email address.
                            </Typography>
                <Grid className={classes.container} container spacing={8}>
                    <Grid className={classes.circlecont} item xs={12} sm={12}>
                        <CircularProgress className={classes.progress} />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

let connectedApp = compose(
    withStyles(styles, { name: 'ConfirmExternal' }),
    connect(mapStateToProps, null)
)(ConfirmExternal);

export { connectedApp as ConfirmExternal }; 