import React, { Component } from 'react';
import { AppBar, IconButton, FontIcon } from 'material-ui';
import NavDrawer from './NavDrawer';
import NavBar from './NavBar';
// import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  handleHamburgerClick = () => this.setState({ open: !this.state.open });
  handleDrawerClose = () => this.setState({ open: false });
  render() {
    const navLinks = [
      { path: '/', name: 'Home', shortName: 'Home', exact: true },
      {
        path: '/candidates',
        name: 'Our Candidates',
        shortName: 'Candidates',
        exact: false,
      },
      {
        path: '/districts',
        name: 'Our Districts',
        shortName: 'Districts',
        exact: false,
      },
      { path: '/research', name: 'Our Research', shortName: 'Research', exact: false },
      {
        path: '/take-action',
        name: 'Take Action!',
        shortName: 'Act!',
        exact: true,
      },
      {
        path: '/about-us',
        name: 'About Us',
        shortName: 'About Us',
        exact: true,
      },
    ];
    return (
      <header className="Header">
        <div className="hidden-md-up">
          <AppBar
            position="static"
            color="primary"
            title={<span>Local Majority</span>}
            iconElementLeft={
              <IconButton>
                <FontIcon
                  className="fa fa-bars"
                  aria-label="Open navigation Menu"
                />
              </IconButton>
            }
            onLeftIconButtonTouchTap={this.handleHamburgerClick}
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
