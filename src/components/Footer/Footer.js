import React from 'react';
import { NavLink } from 'react-router-dom';
import navLinks from '../../navLinks.js';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';

const Footer = ({socialMedia=[]}) => (
  <footer className="Footer full-width background-dark">
    <div className="container">
      <p className="text-center">
        <small>
          PAID FOR BY LOCAL MAJORITY AND NOT AUTHORIZED BY ANY CANDIDATES OR
          CANDIDATE’S COMMITTEE.<br />
          &copy;2018 LOCAL MAJORITY. ALL RIGHTS RESERVED. LOCALMAJORITY.ORG
        </small>
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
      { socialMedia && (
        <div style={{textAlign: 'center', padding: "16px 0px 8px"}}>
          {socialMedia.map(url=><SocialIcon url={url} style={{display: "inline-block", width: "30px", height: "30px", position: "relative", overflow: "hidden", verticalAlign: "middle"}}/>)}
        </div>
      )}
    </div>
  </footer>
);

export default Footer;

