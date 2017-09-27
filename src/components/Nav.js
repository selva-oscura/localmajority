import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
	const navLinks = [
		{path: '/', name: 'Home', exact: true},
		{path: '/candidates', name: 'Our Candidates', exact: false},
		{path: '/districts', name: 'Our Districts', exact: false},
		{path: '/issues', name: 'Issues', exact: false},
	];
	return (
		<nav className="Nav">
			{
				navLinks.map((link, i) => (
					<NavLink
						to={link.path}
						exact={link.exact}
						activeClassName="selected">{link.name}
					</NavLink>
				))
			}
		</nav>
	);
};

export default Nav;
