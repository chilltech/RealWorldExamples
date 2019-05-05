import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackBarAlert } from '../_components/SnackBarAlert'
import { alertActions } from '../_actions';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});


class LayoutAuth extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;

    this.state = {
      snackOpen: true,
    };

    this.handleSnackClose = this.handleSnackClose.bind(this);
  }

  handleSnackClose(event, reason) {
    const { dispatch } = this.props;

    if (reason === 'clickaway') {
      return;
    }

    dispatch(alertActions.clear());
  };


  render() {

    const { alert, children, classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <CssBaseline />
          {children}
        </Paper>
        {alert.message &&
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.snackOpen}
            autoHideDuration={6000}
          >
            <SnackBarAlert
              onClose={this.handleSnackClose}
              variant={alert.type}
              message={alert.message}
            />
          </Snackbar>

        }
      </main>

    );
  }
}

function mapStateToProps(state) {
  const { alert, snackOpen, authentication } = state;
  return {
    alert,
    snackOpen,
    authentication
  };
}

export default compose(
  withStyles(styles, { name: 'LayoutAuth' }),
  connect(mapStateToProps, null)
)(LayoutAuth);
