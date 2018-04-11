import React from 'react';
import { NavLink } from 'react-router-dom';
import navLinks from '../../navLinks.js';
import './Footer.css';

const Footer = () => (
  <footer className="Footer full-width">
    <div className="container">
      <p className="text-center">
        PAID FOR BY LOCAL MAJORITY AND NOT AUTHORIZED BY ANY CANDIDATES OR
        CANDIDATE’S COMMITTEE.<br />
        &copy;2018 LOCAL MAJORITY. ALL RIGHTS RESERVED. LOCALMAJORITY.ORG
        LOCALMAJORITY.ORG
      </p>
      <div className="hidden-sm-down">
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
    </div>
  </footer>
);

export default Footer;
