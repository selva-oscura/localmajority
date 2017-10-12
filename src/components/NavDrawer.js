import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem } from 'material-ui';
import './NavDrawer.css';

const NavDrawer = ({
  navLinks,
  handleDrawerClose,
  open,
  changeDrawerState,
}) => {
  return (
    <Drawer
      className="NavDrawer"
      docked={false}
      width={200}
      open={open}
      onRequestChange={changeDrawerState}
    >
      <List className="NavList">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            exact={link.exact}
            activeClassName="selected"
            onClick={handleDrawerClose}
          >
            <ListItem>{link.name}</ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
