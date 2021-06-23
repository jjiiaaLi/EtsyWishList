import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory, Link} from 'react-router-dom';
import {getWishlistItems,removeProductFromWishlist} from '../store/product';
import './IndividualWishlist.css';

export default function IndividualWishlist(){
    const {wishlistId}=useParams()
    const dispatch=useDispatch()
    const products=useSelector(state=>Object.values(state.product))
    
    
    useEffect(()=>{
        dispatch(getWishlistItems(wishlistId))
    },[dispatch])

    const removeItem=async(e)=>{
        e.preventDefault()
        await dispatch(removeProductFromWishlist(e.target.value))
        window.location.reload()
    }

    const openInNewTab=(e)=>{
        e.preventDefault()
        const newWindow = window.open(`http://etsy.com/listing/${e.target.value}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className='wishlistContainer'>
            {products.map(product=>(
                <div className='eachProduct'>
                    <p>{product.name}</p>
                    <img className='wishlistproductimage' src={product.image_url} alt='product'/>
                    <p>${product.price}</p>
                    <button className="button" value={product.id} onClick={removeItem}>delete</button>
                    <button className="button" value={product.product_id} onClick={openInNewTab}>
                        View in Etsy
                    </button>
                </div>
            ))}
        </div>
    )
}