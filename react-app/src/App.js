import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Products from "./components/Products"
import IndividualProduct from "./components/IndividualProduct";
import HomePage from "./components/HomePage";
import CreateWishlist from "./components/CreateWishlist";
import IndividualWishlist from "./components/IndividualWishlist";
import Root from './components/Root'
import Footer from './components/Footer'
import './index.css'

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <HomePage />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Root />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <ProtectedRoute path="/products/:listingId">
          <IndividualProduct />
        </ProtectedRoute>
        <Route path="/wishlist/:wishlistId">
          <IndividualWishlist />
        </Route>
      </Switch>
      <Footer/>
      
    </BrowserRouter>
  );
}

export default App;
