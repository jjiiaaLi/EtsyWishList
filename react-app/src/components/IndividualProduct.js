import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import { loadAllProducts } from "../store/product";
import './IndividualProduct.css'


export default function IndividualProduct(){
    const {listingId}=useParams();
    const products = useSelector((state) => Object.values(state.product));
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadAllProducts());
    }, [dispatch]);

    const product= products.filter(product=>{
        if(product.listing_id===Number(listingId)){
            return product
        }
    })
    
    const titleFunc=(title)=>{
        if (title.length>15){
            
            return title.slice(0,30)+'...'
        }
        else{
            return title
        }
    }
    const productTitle = titleFunc(product[0]?.title);

    const selectWishList= async(e) =>{
        e.preventdefault()
        return null;
    }
    
    if(!product){
        return (<h3>Loading...</h3>)
    }
    return (
      <div className="individualProductDiv">
        <img
          className="individualImage"
          src={product[0]?.MainImage.url_fullxfull}
        />
        <p>{productTitle}</p>
        <p>{`$ ${product[0]?.price}`}</p>
        <p>{product[0].description}</p>
        <button onClick={selectWishList}>Add To Wish List</button>
      </div>
   
    );
}