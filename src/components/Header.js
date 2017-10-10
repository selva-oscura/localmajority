import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Drawer, IconButton } from 'material-ui';
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
      { path: '/issues', name: 'Issues', shortName: 'Issues', exact: false },
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
            menuElementLeft={<IconButton label={'Open Navigation Menu'} />}
            onLeftIconButtonTouchTap={this.handleHamburgerClick}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
            {navLinks.map((link, i) => (
              <h3 key={i}>
                <NavLink
                  to={link.path}
                  exact={link.exact}
                  activeClassName="selected"
                  onClick={this.handleDrawerClose}
                >
                  {link.name}
                </NavLink>
              </h3>
            ))}
          </Drawer>
        </div>
        <div className="hidden-sm-down">
          <NavBar navLinks={navLinks} />
        </div>
      </header>
    );
  }
}

export default Header;
