
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';

export const AccountMenu = (props) => (
  <Menu anchorEl={props.anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={props.isMenuOpen}
    onClose={props.handleMenuClose}
  >
    <MenuItem component={Link} to="/account" onClick={props.handleMenuClose}>Account</MenuItem>
    <MenuItem component={Link} to="/profile" onClick={props.handleMenuClose}>Profile</MenuItem>
    <MenuItem component={Link} to="/changepassword" onClick={props.handleMenuClose}>Change Password</MenuItem>
    <MenuItem component={Link} to="/login" onClick={props.handleMenuClose}>Logout</MenuItem>
  </Menu>
);

AccountMenu.propTypes = {
  anchorEl: PropTypes.object,
  mobileOpen: PropTypes.bool,
  handleMenuClose: PropTypes.func
};

export const AccountMobileMenu = (props) => (
  <Menu
    anchorEl={props.mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={props.isMobileMenuOpen}
    onClose={props.handleMobileMenuClose}
  >
    <MenuItem>
      <IconButton color="inherit">
        <Badge badgeContent={props.MailCount} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <p>Messages</p>
    </MenuItem>
    <MenuItem>
      <IconButton color="inherit">
        <Badge badgeContent={props.NotificationCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>
    <MenuItem onClick={props.handleProfileMenuOpen}>
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
      <p>Profile</p>
    </MenuItem>
  </Menu>
);

AccountMobileMenu.propTypes = {
  mobileMoreAnchorEl: PropTypes.object,
  isMobileMenuOpen: PropTypes.bool,
  NotificationCount: PropTypes.string,
  MailCount: PropTypes.string,
  handleMobileMenuClose: PropTypes.func
};