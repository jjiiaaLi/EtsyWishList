import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadAllProducts} from "../store/product";
import styles from './productListing.css'
import {Link} from 'react-router-dom';


export default function Products(){
    const products= useSelector(state=>Object.values(state.product))
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllProducts())
    },[dispatch])
    console.log(products)
    return (
      <div className="productsContainer">
        {products.map((product) => (
          <Link to={`/products/${product.listing_id}`}>
            <div className="eachProduct">
              <div classname="productListing">
                <img
                  className="listingImage"
                  src={product.MainImage.url_fullxfull}
                />
                <p>{"$" + product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
}


