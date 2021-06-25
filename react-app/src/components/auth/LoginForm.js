import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,Link } from "react-router-dom";
import { login } from "../../store/session";
import "./forms.css"
const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`}/>;
  }

  const demoUser=async(e)=>{

    const data = await dispatch(login('demo@aa.io', "password"));
    if (data.errors) {
      setErrors(data.errors);
    }
  }

  return (
    <div className ="formWrapper">
      <div className = "loginFormDiv">
      <form onSubmit={onLogin}>
          {errors.map((error) => (
            <div className="errorsDiv">{error}</div>
          ))}
        <div className="formInputWrapper">
          <div className="formTitle">
            Login
          </div>
        <div className="emailInput">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
            />
        </div>
        <div className="passwordInput">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            />
            </div>
            <button onClick={demoUser} >Login As Demo User</button>
            <div className="buttonDiv">
          <button className="button" type="submit">Login</button>
          </div>
          <Link className="formLink"to='/sign-up' >Don't Have An Account?</Link>
        </div></form>
            </div>

    </div>
  );
};

export default LoginForm;
