import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadWishlists } from "../store/wishLists";


export default function AddToWishList(){
    const dispatch=useDispatch()
    const [listing_id, setListing_id]=useState('')
    const [wishlist_id, setWishList_id]=useState(0)
    const wishlists = useSelector((state) => Object.values(state.wishlist));

    


    return (
        <div className='addwishlistcontainer'>

        </div>
    )
}