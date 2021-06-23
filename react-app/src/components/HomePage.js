import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWishlists } from "../store/wishLists";
import { Link } from "react-router-dom";
import "./HomePage.css";
import CreateWishlist from "./CreateWishlist";
import "./context/Modal.css"



export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => Object.values(state.session));
  const userId = user[0]["id"];
  const wishlists = useSelector((state) => Object.values(state.wishlist));

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  useEffect(() => {
    dispatch(loadWishlists(userId));
  }, [dispatch]);

  return (
    <div className="homeWrapper">
    <div className="wishListContainer">
      {wishlists.map((wishlist) => (
        <div className="individualWishListDiv">
          <Link to={`/wishlist/${wishlist.id}`}>
            <div className="wishListName">{wishlist.name}</div>
          </Link>
        </div>

      ))}
      <div className="ModalComp">
        {!show && <button className="createButton" onClick={openModal}>New Wish List</button>}
        <CreateWishlist closeModal={closeModal} show={show} />
      </div>
    </div>
    </div>
  );
}
