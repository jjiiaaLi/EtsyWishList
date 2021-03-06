import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadAllProducts} from "../store/product";
import './productListing.css'
import {Link} from 'react-router-dom';


export default function Products(){
    const [ titleLen,setTitleLen] = useState(30)
    const [focusTitle, setFocusTitle] = useState(null)
    


    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllProducts());

    },[dispatch])
    const products= useSelector(state=>Object.values(state.product))
    return (
      <div className="productsContainer">
        {products.map((product, i) => (
        <div className= "indivProductContainer">
        {product.MainImage && <Link key={product.listing_id} className="productCard"
            style={{
              backgroundImage: `url("${product.MainImage.url_fullxfull}")`,
            }}
            onMouseEnter={() => {
              setFocusTitle(product.listing_id);
            }}
            onMouseLeave={() => setFocusTitle(null)}
            to={`/products/${product.listing_id}`}
          >

            {product.title && (
              <div className="title">{`${product.title.slice(
                0,
                focusTitle === product.listing_id ? 50 : 30
              )}...`}</div>
            )}

              <div className="prices">{"$" + product.price}</div>
          </Link>}</div>
        ))}

      </div>
    );
}
