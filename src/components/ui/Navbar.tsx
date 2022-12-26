import 'bootstrap/js/src/collapse.js';
import { routes } from 'constants/routesConstants';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-xxl p-4 pb-0">
          <Link className="navbar-brand" to={routes.HOME}>
            <img src="/images/logo.png" alt="SkillUp Mentor" width={123} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end align-items-center"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item pe-4">
                <NavLink className="nav-link" to={routes.HOME}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item pe-4">
                <NavLink className="nav-link" to={routes.DASHBAORD_PREFIX}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item pe-4">
                <NavLink className="nav-link" to={routes.LOGIN}>
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link pe-0" to={routes.SIGNUP}>
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
