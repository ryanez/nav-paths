import React from 'react';
import { Link } from 'react-router-dom';
import { Paths } from 'navigate';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="https://github.com/ryanez/nav-paths">nav-paths@github</a>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={Paths.Home} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={Paths.Profiles} className="nav-link">Profiles</Link>
            </li>
            <li className="nav-item">
              <Link to={Paths.AboutUs} className="nav-link">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>    
  );
}