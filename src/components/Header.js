import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import NavBar from './NavBar';
// import './Header.css';

class Header extends Component{
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
