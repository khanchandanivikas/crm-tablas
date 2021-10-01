import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css"

const Navbar = () => {
  return (
    <div className="nav">
      <p className="logo">NeoMotors Co.</p>
      <ul>
        <Link to="/">
          <li><i className="fas fa-users"></i></li>
        </Link>
        {/* <Link to="/eventos">
          <li>E</li>
        </Link> */}
        <Link to="/calendar">
          <li><i className="far fa-calendar-alt"></i></li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
