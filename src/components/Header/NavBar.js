import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ navLinks }) => {
  return (
    <div className="NavBar container">
      <img
        src="/images/local_majority_banner.png"
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
            <span className="hidden-md-down">{link.name}</span>
            <span className="hidden-lg-up">{link.shortName}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
