/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Routes, Link, Route, Navigate, useLocation,
} from 'react-router-dom';
import './nav.css';

function Header() {
  const isAuth = useSelector((store) => store.isAuth);
  const userName = useSelector((store) => store.user.login);
  const cuisines = useSelector((store) => store.cuisines);
  const types = useSelector((store) => store.types);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <p className="navbar-brand">Holodilnichek</p>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              {isAuth
                ? (
                  <div className="profLink">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <span data-bs-toggle="offcanvas">
                      <Link to="/profile">
                        {userName}
                      </Link>
                    </span>
                  </div>
                )
                : (
                  <div className="profLink">
                    <span data-bs-toggle="offcanvas"><Link to="/login">Login |</Link></span>
                    <span data-bs-toggle="offcanvas"><Link to="/registration">| Registration</Link></span>
                  </div>
                )}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link-text" to="/">На главную</Link>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <Link className="nav-link-text" to="/my-ref">Мой холодильник</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  National cuisine
                </a>
                <ul className="dropdown-menu nav-link-text">
                  {cuisines.map((cuisine) => <li data-bs-dismiss="offcanvas" key={cuisine}><Link to={`/cuisine/${cuisine}`} className="dropdown-item">{cuisine}</Link></li>)}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Types
                </a>
                <ul className="dropdown-menu nav-link-text">
                  {types.map((type) => <li data-bs-dismiss="offcanvas" key={type}><Link to={`/type/${type}`} className="dropdown-item">{type}</Link></li>)}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
