import React from "react";
import appLogo from "./appLogo.png";

const AppBar = () => (
  <header className="navbar fixed-top navbar-dark bg-dark">
    <div className="navbar-brand" href="#">
      <span>
        <img className="app-logo" src={appLogo} />
      </span>
    </div>
  </header>
);
export default AppBar;
