import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar';
import "./Nav.css"

const NavBar = () => {

  let userId
  let user=useSelector(state=>state.session.user)

  if (user){

    userId=user.id
    return (
      <div className="navContainer">
        <nav className="NavBar">
          <ul>
            <li>
              {user && (
                <NavLink
                  to={`/users/${userId}`}
                  exact={true}
                  activeClassName="active"
                >
                  Home
                </NavLink>
              )}
            </li>

            <li>
              <SearchBar />
            </li>
            <li>
              <NavLink to="/products" exact={true} activeClassName="active">
                Products
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <div className="navContainer">
      <nav className="NavBar">
        <ul>
          <li>
            {user && (
              <NavLink
                to={`/users/${userId}`}
                exact={true}
                activeClassName="active"
              >
                Home
              </NavLink>
            )}
          </li>
          <li>
            <SearchBar />
          </li>
          <li>
            <NavLink to="/products" exact={true} activeClassName="active">
              Products
            </NavLink>
          </li>
          <div className="loginSignup">
            <li>
              <NavLink to="/login" exact={true} activeClassName="active">
                <div className="liButton">Login</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                <div className="liButton"> Sign Up</div>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
