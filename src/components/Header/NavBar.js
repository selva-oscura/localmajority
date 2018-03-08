import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ navLinks }) => {
  return (
    <div className="NavBar">
      <h1>Local Majority</h1>
      <nav>
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
    </div>
  );
};

export default NavBar;
