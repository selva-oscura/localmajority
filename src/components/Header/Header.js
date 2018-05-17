import React, { Component } from 'react';
import { AppBar, IconButton, FontIcon } from 'material-ui';
import NavDrawer from './NavDrawer';
import NavBar from './NavBar';
import navLinks from '../../navLinks.js';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleHamburgerClick = () => this.setState({ open: !this.state.open });
  handleDrawerClose = () => this.setState({ open: false });
  render() {
    return (
      <header className="Header full-width">
        <div className="hidden-md-up ">
          <AppBar
            className="AppBar"
            style={{ backgroundColor: '#18467e' }}
            position="static"
            title={<span>Local Majority</span>}
            iconElementLeft={
              <IconButton>
                <FontIcon
                  className="fa fa-bars"
                  aria-label="Open navigation Menu"
                />
              </IconButton>
            }
            onLeftIconButtonClick={this.handleHamburgerClick}
          />
          <NavDrawer
            navLinks={navLinks}
            handleDrawerClose={this.handleDrawerClose}
            open={this.state.open}
            changeDrawerState={open => this.setState({ open })}
          />
        </div>
        <div className="hidden-sm-down">
          <NavBar navLinks={navLinks} />
        </div>
      </header>
    );
  }
}

export default Header;
