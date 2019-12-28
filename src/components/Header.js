import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <h2>Expensify</h2>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create
    </NavLink>
  </header>
);

export default Header;