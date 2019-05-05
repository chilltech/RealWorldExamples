import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { userActions } from '../../_actions';
import { InValidEmail } from '../../_utils/forms.validation';
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

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            // loading: true,
            // user: {},
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch, } = this.props
        dispatch(userActions.get());
    }

    componentDidUpdate(prevProps) {
        if (typeof this.props.user !== "undefined" && (this.state.user === null || typeof this.state.user === "undefined")) {
            this.setState({ user: this.props.user });

        }
    }


    handleValidation(user) {
        let errors = {};

        //Email
        if (user.Email === "") {
            errors["Email"] = "Cannot be empty";
        }
        else {
            if (InValidEmail(user.Email)) {
                errors["Email"] = "Email is not valid";
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
        // const { name, value } = event.target;
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
            dispatch(userActions.update(user));
        }
    }


    render() {
        let content;
        const { classes, loading } = this.props;
        const { errors, submitted, user } = this.state;

        if (loading ||  typeof this.state.user === "undefined" ) {
            content = <div>Loading...</div>;
        } else {
            // this.setState({ user: user });

            content =
                <form className={classes.form} name="form" onSubmit={this.handleSubmit}>
                    <Grid className={classes.profileContainer} container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField id="FirstName" name="FirstName" type="text" label="First Name" value={user.FirstName} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["password"] !== 'undefined' ? errors["FirstName"] : '')}
                                    error={(submitted && typeof errors["FirstName"] !== 'undefined')}
                                    autoComplete="FirstName" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField id="LastName" name="LastName" type="text" label="Last Name" value={user.LastName} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["password"] !== 'undefined' ? errors["LastName"] : '')}
                                    error={(submitted && typeof errors["LastName"] !== 'undefined')}
                                    autoComplete="LastName" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField id="Username" name="Username" type="text" label="User Name" value={user.Username} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["Username"] !== 'undefined' ? errors["Username"] : '')}
                                    error={(submitted && typeof errors["Username"] !== 'undefined')}
                                    autoComplete="Username" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl margin="normal" required fullWidth>
                                <TextField id="PhoneNumber" name="PhoneNumber" type="text" label="Phone" value={user.PhoneNumber} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["PhoneNumber"] !== 'undefined' ? errors["PhoneNumber"] : '')}
                                    error={(submitted && typeof errors["PhoneNumber"] !== 'undefined')}
                                    autoComplete="PhoneNumber" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl margin="normal" required fullWidth >
                                <TextField id="Email" name="Email" label="Email" value={user.Email} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["Email"] !== 'undefined' ? errors["Email"] : '')}
                                    error={(submitted && typeof errors["Email"] !== 'undefined')}
                                    autoComplete="Email" autoFocus />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" size="medium" fullWidth variant="contained" color="primary" className={classes.submit}>Update Profile</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="medium" fullWidth variant="contained" color="secondary" className={classes.submit} component={Link} to={paths.ACCOUNT} >Cancel</Button>
                        </Grid>
                    </Grid>
                </form>
        }

        return (


            <Paper className={classes.root} elevation={1}>
                {content}
            </Paper>
        );
    }
}

// function mapStateToProps(state) {
//     console.log("--State--");
//     console.log(state);

//     const { authentication } = state;
//     const { user } = authentication;
//     return {
//         user
//     };
// }


const mapStateToProps = state => (
    {
        user: state.user.user,
        loading: state.user.loading,
        error: state.user.error
    });

let connectedApp = compose(
    withStyles(styles, { name: 'Profile' }),
    connect(mapStateToProps, null)
)(Profile);

export { connectedApp as Profile }; 