import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from './Footer'
import './Root.css'



export default function Root(){

    let user = useSelector((state) => state.session.user);

    if(!user) return (
      <div className="rootWrapper">
        <div className="login-Signup">
          <div className="rootSent">
            Please{" "}
            <Link className="wLLink" to="/login">
              Login
            </Link>{" "}
            or{" "}
            <Link className="wLLink" to="/sign-up">
              Signup{" "}
            </Link>
            to start making wishlists
          </div>
          <div className="rootSent">Join the Wishlist Community!</div>
        </div>
      </div>
    );
    else return (
      <div className="rootWrapper">

        <div className="login-Signup">
        <div className="rootSent">Welcome {user.username}!</div>
        <div className="rootSent">
          Click{" "}
          <Link
            className="wLLink"
            to={`/users/${user.id}`}
            exact={true}
            activeClassName="active"
            >
            here
          </Link>{" "}
          to check out your wishlists.
        </div>
      </div>
      <Footer/>
    </div>
    );
}
