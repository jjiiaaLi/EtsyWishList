import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWishlists, deletewishlist } from "../store/wishLists";
import { checkParam } from "../store/session";
import { Link , useParams, useHistory} from "react-router-dom";
import "./HomePage.css";
import CreateWishlist from "./CreateWishlist";
import Footer from "./Footer";
import "./context/Modal.css";
import {loadFriend} from '../store/friends';

export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => Object.values(state.session));
  const userId = user[0]["id"];
  const paramId = useParams();
  const wishlists = useSelector((state) => Object.values(state.wishlist));
  let wishlistName = "";

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const userFriends = useSelector((state) => Object.values(state.friend));

  const friendsArray = user[0].friends.split(",");
  useEffect(() => {
    dispatch(loadWishlists(paramId.userId));
    dispatch(loadFriend(friendsArray));
  }, [dispatch, paramId.userId]);

  if (paramId.userId == userId) {
    wishlistName = "My Wish Lists";
  } else {
    let friendName;
    userFriends.forEach((friend) => {
      if (friend.id == paramId.userId) {
        friendName = friend.username;
      }
    });
    wishlistName = `${friendName}'s Wish List`;
  }
  const checkParam = async (paramId) => {
    const res = await fetch(`/api/auth/${paramId}`);
    
    if (res.status !== 200) {
      
      history.push('/asdfg')
    }
  };
  
  
  
    return (
      <div className="homeWrapper">
        <CreateWishlist closeModal={closeModal} show={show} />
        {userFriends && (
          <div className="friendsContainer">
            <div className="friendsTitle">Friends</div>
            {userFriends.map((friend) => (
              <Link className="friendLink" to={`/users/${friend.id}`}>
                {friend.username}
              </Link>
            ))}
          </div>
        )}
        <div className="listDiv">
          <div className="wishListTitle">{wishlistName}</div>

          <div className="wishListContainer">
            {wishlists.map((wishlist) => (
              <div className="individualWishListDiv">
                <Link to={`/wishlist/${wishlist.id}`}>
                  <div className="wishListName">{wishlist.name}</div>
                </Link>
                <button className='deletewishlistbtn' value={wishlist.id}onClick={e=>{dispatch(deletewishlist(e.target.value));
                window.location.reload();
                }}>delete</button>
              </div>
            ))}
          </div>
          <div className="ModalComp">
            {!show && paramId.userId == userId && (
              <button className="createButton" onClick={openModal}>
                New Wish List
              </button>
            )}
          </div>
        </div>
        <Footer/>
      </div>
    );
}
