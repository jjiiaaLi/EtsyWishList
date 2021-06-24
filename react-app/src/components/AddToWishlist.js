import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useParams } from "react-router-dom";
import { loadWishlists, editWishlist } from "../store/wishLists";



export default function AddToWishList(props){
    const { show, closeModal } = props;
    const dispatch=useDispatch()
    const history=useHistory()
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

    useEffect(async()=>{
        
        await dispatch(editWishlist(listing_id, wishlist_id,title,image_url,price));
        
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
            <button id="close" onClick={closeModal}>X</button>
        <div className='addwishlistcontainer' >
            {wishlists.map(wishlist=>(
                <button  onClick={changeWishlistId} value={wishlist.id} className='addTo' >{wishlist.name}</button>
            ))}
        </div>
        
        
        </div>
        </>
    )
}

