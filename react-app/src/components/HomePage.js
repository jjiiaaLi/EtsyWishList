import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from "react-redux";
import { loadWishlists } from '../store/wishLists';
import {Link} from 'react-router-dom';
import './HomePage.css';

export default function HomePage(){
    const dispatch=useDispatch()
    const user = useSelector(state=>Object.values(state.session))
    const userId=user[0]["id"]
    const wishlists=useSelector(state=>Object.values(state.wishlist))

    useEffect(()=>{
        dispatch(loadWishlists(userId))
    },[dispatch])

   
    return (
        <div className='wishListContainer'>
            {wishlists.map(wishlist=>(
                <div className='individualWishListDiv'>
                    <Link to={`/wishlist/${wishlist.id}`} >
                        <div className='wishListName'>{wishlist.name}</div>
                    </Link>
                </div>
            ))}
            <button className='addWishListBtn'>add new wishlist</button>
        </div>
    )
}