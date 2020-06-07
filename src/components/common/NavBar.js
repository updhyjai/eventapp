import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../utils/constants";

const NavBar = () => {
  const activeStyle = {
    color: "#7AC269",
    background: "white",
    borderBottom: "2px solid #7AC269",
    fontWeight: "bold",
  };

  return (
    <div>
      <h1 className="heading">Manage Campaigns</h1>
      <nav>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={PATH.UPCOMING}
              activeStyle={activeStyle}
              exact
            >
              Upcoming Campaigns
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={PATH.LIVE}
              activeStyle={activeStyle}
            >
              Live Campaigns
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={PATH.PAST}
              activeStyle={activeStyle}
            >
              Past Campaigns
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
