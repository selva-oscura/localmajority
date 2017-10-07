import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
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
    <nav className="Nav">
      <div className="show-on-small">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            exact={link.exact}
            activeClassName="selected"
          >
            {link.shortName}
          </NavLink>
        ))}
      </div>
      <div className="hide-on-small">
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
      </div>
    </nav>
  );
};

export default Nav;
