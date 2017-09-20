import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
	return (
		<nav className="Nav">
			<NavLink
			  to="/"
			  exact
   			activeClassName="selected">Home
   		</NavLink>

			<NavLink
			  to="/candidates"
			  exact
   			activeClassName="selected">Our Candidates
   		</NavLink>

			<NavLink
			  to="/districts"
			  exact
   			activeClassName="selected">Our Districts
   		</NavLink>

			<NavLink
			  to="/issues"
			  exact
   			activeClassName="selected">Issues
   		</NavLink>


		</nav>
	);
};

export default Nav;
