import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import NavBar from './NavBar';
// import './Header.css';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
  }
  handleHamburgerClick(){
    console.log('clicked!');
  }
  render(){
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
	    { path: '/about-us', name: 'About Us', shortName: 'About Us', exact: true },
	  ];
	  return (
	    <header className="Header">
	      <div className="hidden-md-up">
	        <AppBar
	          position="static"
	          color="primary"
	          title={<span>Local Majority</span>}
	          onLeftIconButtonTouchTap={this.handleHamburgerClick}
	        >
	        </AppBar>
	        <Drawer>
            {navLinks.map((link, i) => (
            	<h3 key={i}>
							  <NavLink
							    to={link.path}
							    exact={link.exact}
							    activeClassName="selected"
							  >
							    {link.name}
							  </NavLink>
						  </h3>
            ))}
	        </Drawer>
	      </div>
	      <div className="hidden-sm-down">
		      <NavBar 
		      	navLinks={navLinks}
		      />
		    </div>
	    </header>
	  );
  }

}

export default Header;
