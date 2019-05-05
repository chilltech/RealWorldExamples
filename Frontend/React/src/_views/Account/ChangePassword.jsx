import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
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

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            chgpass: {
                oldPassword:'',
                newPassword:'',
                conPassword:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    handleValidation(chgpass) {
        let errors = {};
        let formIsValid = false;

        if (chgpass.newPassword === "") {
            errors["newPassword"] = "Cannot be empty";
        }
        if (chgpass.oldPassword === "") {
            errors["oldPassword"] = "Cannot be empty";
        }
        else if (chgpass.conPassword === "") {
            errors["conPassword"] = "Cannot be empty";
        }
        else {
            if (chgpass.newPassword !== chgpass.conPassword) {
                formIsValid = false;
                errors["conPassword"] = "New Password does not match the Confirm Password.";
            }
        }

        this.setState({ errors: errors });
        return Object.keys(errors).length === 0;
    }

    handleChange(e) {
        // const { name, value } = event.target;
        const { name, value } = e.target;
        const { chgpass } = this.state;
        this.setState({
            chgpass: {
                ...chgpass,
                [name]: value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { chgpass } = this.state;
        const { dispatch } = this.props;
        if (this.handleValidation(chgpass)) {
            dispatch(userActions.changePassword(chgpass));
        }
    }


    render() {
        const { classes } = this.props;
        const { chgpass, errors, submitted } = this.state;
        return (
            <Paper className={classes.root} elevation={1}>
                <form className={classes.form} name="form" onSubmit={this.handleSubmit}>
                    <Grid className={classes.ChangePasswordContainer} container spacing={24}>
                        <Grid item xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <TextField id="oldPassword" name="oldPassword" type="password" label="Current Password" value={chgpass.oldPassword} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["oldPassword"] !== 'undefined' ? errors["oldPassword"] : '')}
                                    error={(submitted && typeof errors["oldPassword"] !== 'undefined')}
                                    autoComplete="current-password" required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <TextField id="newPassword" name="newPassword" type="password" label="New Password" value={chgpass.newPassword} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["newPassword"] !== 'undefined' ? errors["newPassword"] : '')}
                                    error={(submitted && typeof errors["newPassword"] !== 'undefined')}
                                    autoComplete="new-password" required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl margin="normal" fullWidth>
                                <TextField id="conPassword" name="conPassword" type="password" label="Confirm Password" value={chgpass.conPassword} onChange={this.handleChange}
                                    helperText={(submitted && typeof errors["conPassword"] !== 'undefined' ? errors["conPassword"] : '')}
                                    error={(submitted && typeof errors["conPassword"] !== 'undefined')}
                                    required />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" size="medium" fullWidth variant="contained" color="primary" className={classes.submit}>Update</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="medium" fullWidth variant="contained" color="secondary" className={classes.submit} component={Link} to={paths.ACCOUNT} >Cancel</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

let connectedApp = compose(
    withStyles(styles, { name: 'ChangePassword' }),
    connect(mapStateToProps, null)
)(ChangePassword);

export { connectedApp as ChangePassword }; 