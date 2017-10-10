import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({navLinks}) => {
  return (
    <nav className="NavBar">
      {navLinks.map((link, i) => (
        <NavLink
          key={i}
          to={link.path}
          exact={link.exact}
          activeClassName="selected"
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
