import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem } from 'material-ui';

const NavDrawer = ({navLinks, handleDrawerClose, open, changeDrawerState}) => {
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
          <ListItem key={i}>
            <NavLink
              to={link.path}
              exact={link.exact}
              activeClassName="selected"
              onClick={handleDrawerClose}
            >
              {link.name}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
