import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ navLinks }) => {
  return (
    <div className="NavBar container">
      <img
        src="./images/local_majority_banner.png"
        alt="Local Majority logo"
        className="logo"
      />
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
