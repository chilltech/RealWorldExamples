import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import config from 'config';
import { userActions } from '../../_actions';
import { paths } from '../../_constants';

const styles = theme => ({
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleExterClick = this.handleExterClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    handleExterClick(e) {
        const { dispatch } = this.props;


        if (typeof e !== 'undefined' && e.length > 0) {
        //    console.log(e);
            let url = `${config.apiUrl}/Account/Connect?provider=${e}&returnUrl=${encodeURIComponent(`${config.baseUrl}/public/auth.html`)}`;

            let loginWindow = window.open(url, '', 'width=600,height=400');

            if (loginWindow.addEventListener) {
                loginWindow.addEventListener('message', function (ev) {

                    let externalValue = ev.source.message;

                    if (ev.target.window) {
                        ev.target.window.close();
                    }

                    if (typeof externalValue !== "undefined" && typeof externalValue.token !== "undefined") {
                        dispatch(userActions.saveToken(externalValue.token));
                    }

                }, false);
            }
        }
        return false;
    }

    render() {
        const { loggingIn, classes } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <React.Fragment>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Login</Typography>
                <form className={classes.form} name="form" onSubmit={this.handleSubmit}>
                    <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <Button fullWidth variant="contained" color="primary" onClick={() => { this.handleExterClick("Google") }}>Google</Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={12}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" name="username" value={username} onChange={this.handleChange} autoComplete="email" autoFocus
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" value={password} onChange={this.handleChange} id="password" autoComplete="current-password" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Login</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="medium" fullWidth variant="contained" color="secondary" className={classes.register} component={Link} to={paths.REGISTER} >Register</Button>
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication,
    };
}

let connectedApp = compose(
    withStyles(styles, { name: 'Login' }),
    connect(mapStateToProps, null)
)(Login);

export { connectedApp as Login }; 