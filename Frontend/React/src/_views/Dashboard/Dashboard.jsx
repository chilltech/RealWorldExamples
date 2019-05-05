import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../../_actions';
import { withStyles } from '@material-ui/core/styles';
import { ChartLineSimple } from '../../_components'

const styles = theme => ({
    tableContainer: {
        height: 320,
    },
});

const activeListings = [
    { name: 'Mon', Visits: 2200, Orders: 3400 },
    { name: 'Tue', Visits: 1280, Orders: 2398 },
    { name: 'Wed', Visits: 5000, Orders: 4300 },
    { name: 'Thu', Visits: 4780, Orders: 2908 },
    { name: 'Fri', Visits: 5890, Orders: 4800 },
    { name: 'Sat', Visits: 4390, Orders: 3800 },
    { name: 'Sun', Visits: 4490, Orders: 4300 },
];

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.get());
    }

    render() {
        const { user, classes } = this.props;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom component="h2">
                        Active Listings
                    </Typography>
                    <div className={classes.tableContainer}>
                        <ChartLineSimple lineData={activeListings} />
                    </div>
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

let connectedApp = compose(
    withStyles(styles, { name: 'Dashboard' }),
    connect(mapStateToProps)
)(Dashboard);

export { connectedApp as Dashboard }; 