import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { userActions } from '../../_actions';
import { InValidEmail } from '../../_utils/forms.validation';
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
        marginTop: theme.spacing.unit * 3,
    }
});

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            errors: {},
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation(user) {
        let errors = {};
        let formIsValid = false;

        if (user.email === "") {
            errors["email"] = "Cannot be empty";
        }
        else {
            if (InValidEmail(user.email)) {
                errors["email"] = "Email is not valid";
            }
        }
        if (user.password === "") {
            errors["password"] = "Cannot be empty";
        }
        else if (user.confirmPassword === "") {
            errors["confirmPassword"] = "Cannot be empty";
        }
        else {
            if (user.password !== user.confirmPassword) {
                formIsValid = false;
                errors["confirmPassword"] = "Password does not match the confirm password.";
            }
        }

        this.setState({ errors: errors });
        return Object.keys(errors).length === 0;
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (this.handleValidation(user)) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering, classes } = this.props;
        const { user, errors, submitted } = this.state;
        return (
            <React.Fragment>
                <Typography component="h1" variant="h5">Register</Typography>
                <form className={classes.form} name="form" onSubmit={this.handleSubmit}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={12}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField id="email" name="email" label="Username" value={user.email} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["email"] !== 'undefined' ? errors["email"] : '')}
                                    error={(submitted && typeof errors["email"] !== 'undefined')}
                                    autoComplete="email" autoFocus />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField id="password" name="password" type="password" label="Password" value={user.password} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["password"] !== 'undefined' ? errors["password"] : '')}
                                    error={(submitted && typeof errors["password"] !== 'undefined')}
                                    autoComplete="new-password" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" value={user.confirmPassword} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["confirmPassword"] !== 'undefined' ? errors["confirmPassword"] : '')}
                                    error={(submitted && typeof errors["confirmPassword"] !== 'undefined')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" size="medium" fullWidth variant="contained" color="primary" className={classes.submit}>Register</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="medium" fullWidth variant="contained" color="secondary" className={classes.submit} component={Link} to={paths.LOGIN} >Cancel</Button>
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

let connectedApp = compose(
    withStyles(styles, { name: 'Register' }),
    connect(mapStateToProps, null)
)(Register);

export { connectedApp as Register }; 