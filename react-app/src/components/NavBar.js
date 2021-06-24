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
    
    userId=user[2]
  }

  return (
    <div className="navContainer">
    <nav className='NavBar'>
      <ul>
        <li>
          {user && <NavLink to={`/users/${userId}`} exact={true} activeClassName="active">
            Home
          </NavLink>}
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
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

export default NavBar;
