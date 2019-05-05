import React, { Component } from 'react';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackBarAlert } from '../_components/SnackBarAlert'
import { AccountMenu, AccountMobileMenu } from '../_components/NavMenus'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { alertActions } from '../_actions';

const drawerWidth = 240;
const styles = theme => {
    console.log(theme);
    return ({
        palette: {
            primary: {
                light: purple[300],
                main: purple[500],
                dark: purple[700],
            },
            secondary: {
                light: green[300],
                main: green[500],
                dark: green[700],
            },
        },
        typography: {
            useNextVariants: true,
        },
        root: {
            display: 'flex',
            flexGrow: 1,
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            marginLeft: drawerWidth,
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        title: {
            flexGrow: 1,
            [theme.breakpoints.up('md')]: {
                marginLeft: 20,
            },
        },
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: drawerWidth,
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            'padding-top': theme.spacing.unit * 3,
            padding: 0,
            height: '100vh',
            overflow: 'auto',
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing.unit * 3,
            },
        },
        h5: {
            marginBottom: theme.spacing.unit * 2,
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    });
};

class LayoutDashboard extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        this.state = {
            mobileOpen: false,
            snackOpen: true,
        };

        this.handleSnackClose = this.handleSnackClose.bind(this);

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);

        this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this);
        this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this);
    }

    handleSnackClose(event, reason) {
        const { dispatch } = this.props;

        if (reason === 'clickaway') {
            return;
        }

        dispatch(alertActions.clear());
    };

    handleDrawerToggle(e) {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleProfileMenuOpen(event) {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose() {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen(event) {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose() {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { alert, title, subTitle, children, iconText, classes, theme } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {[{ 'name': 'Dashboard', 'link': '/' }].map((item, index) => (
                        <ListItem button key={item.name} component={Link} to={item.link} >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar)}>
                    <Toolbar disableGutters={!this.state.navOpen} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Dashboard
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <AccountMenu
                    anchorEl={anchorEl}
                    isMenuOpen={isMenuOpen}
                    handleMenuClose={this.handleMenuClose}
                />
                <AccountMobileMenu
                    mobileMoreAnchorEl={mobileMoreAnchorEl}
                    isMobileMenuOpen={isMobileMenuOpen}
                    handleMobileMenuClose={this.handleMobileMenuClose}
                    MailCount={"4"}
                    NotificationCount={"17"}
                />
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden mdUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content} >
                    <div className={classes.appBarSpacer} />
                    {children}
                </main>
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
            </div >
        );
    }
}

function mapStateToProps(state) {
    const { alert, navOpen, authentication } = state;
    return {
        alert,
        navOpen,
        authentication
    };
}

LayoutDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles, { withTheme: true }, { name: 'LayoutDashboard' }),
    connect(mapStateToProps, null)
)(LayoutDashboard);