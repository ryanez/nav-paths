import React from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from 'navigate';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="https://github.com/ryanez/nav-paths">nav-paths@github</a>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to={Paths.Home} className="nav-link" exact>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={Paths.Profiles} className="nav-link">Profiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={Paths.AboutUs} className="nav-link">About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>    
  );
}