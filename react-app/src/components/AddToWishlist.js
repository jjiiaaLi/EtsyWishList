import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadWishlists, editWishlist } from "../store/wishLists";
import "./addToWL.css"


export default function AddToWishList(props){
    const { show, closeModal } = props;
    const dispatch=useDispatch()
    
    const user = useSelector((state) => Object.values(state.session));
    const userId = user[0]["id"];
    const [wishlist_id, setWishList_id]=useState(0)
    const wishlists = useSelector((state) => Object.values(state.wishlist));
    const product=useSelector(state=>Object.values(state.product))
    const {listing_id,title,price}=product[0]
    const image_url=product[0].MainImage.url_fullxfull

    useEffect(() => {
      dispatch(loadWishlists(userId));
    }, [dispatch]);

    useEffect(()=>{
        const func=async()=>await dispatch(editWishlist(listing_id, wishlist_id,title,image_url,price));
        func()
    },[wishlist_id])

    const changeWishlistId=(e)=>{
        e.preventDefault()
        setWishList_id(e.target.value);
        closeModal()
    }

    

    return (
      <>
        <div className={show ? "overlay" : "hide"} onClick={closeModal} />
        <div className={show ? "modal" : "hide"}>
          <button id="close" onClick={closeModal}>
            X
          </button>

          <div className="addwishlistcontainer">
            <div className="addWLTitle">Pick a wishlist to add to</div>
            <div className="addWLButtonsContainer">
              {wishlists.length>0 &&
                wishlists.map((wishlist) => (
                  <div className="wishListButtons">
                    <button
                      className="button"
                      onClick={changeWishlistId}
                      value={wishlist.id}
                      className="addTo"
                    >
                      {wishlist.name}
                    </button>
                  </div>
                ))}
              {!wishlists.length>0 && <p className='noWishlistMsg'>You Don't Have Any Wish Lists!</p>}
            </div>
          </div>
        </div>
      </>
    );
}
