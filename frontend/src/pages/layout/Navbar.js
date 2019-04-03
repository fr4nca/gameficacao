import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import classNames from "classnames";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

function Navbar({ auth, logoutUser, location }) {
  const { isAuthenticated } = auth;
  const [open, toggleOpen] = useState(false);

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to="/"
            onClick={() => toggleOpen(false)}
          >
            GAMEDUC
          </Link>
          <a
            onClick={() => {
              toggleOpen(!open);
            }}
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbar_menu"
          className={classNames({ "navbar-menu": true, "is-active": open })}
        >
          {/* 
            TODO: Display different menu options if logged-in
          */}

          <div className="navbar-end">
            {isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => {
                  logoutUser();
                  toggleOpen(false);
                }}
                className="navbar-item is-tab"
              >
                <span className="icon">
                  <i className="fa fa-sign-out-alt" />
                </span>
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className={classNames({
                    "navbar-item": true,
                    "is-tab": true,
                    "is-active": location.pathname === "/register"
                  })}
                  onClick={() => toggleOpen(false)}
                >
                  {!open ? (
                    <span className="icon">
                      <i className="fa fa-user-plus" />
                    </span>
                  ) : (
                    <span>Registrar</span>
                  )}
                </Link>
                <Link
                  to="/login"
                  className={classNames({
                    "navbar-item": true,
                    "is-tab": true,
                    "is-active": location.pathname === "/login"
                  })}
                  onClick={() => toggleOpen(false)}
                >
                  {!open ? (
                    <span className="icon">
                      <i className="fa fa-sign-in-alt" />
                    </span>
                  ) : (
                    <span>Login</span>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar)
);
