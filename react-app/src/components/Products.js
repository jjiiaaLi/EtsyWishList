import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadAllProducts} from "../store/product";
import styles from './productListing.css'
import {Link} from 'react-router-dom';


export default function Products(){
    const [ titleLen,setTitleLen] = useState(30)
    const [focusTitle, setFocusTitle] = useState(null)

    const products= useSelector(state=>Object.values(state.product))
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllProducts())
    },[dispatch])

    return (
      <div className="productsContainer">
        {products.map((product, i) => (
<Link key={product.listing_id} className='productCard'  onMouseEnter={()=> {setFocusTitle(product.listing_id)}} onMouseLeave={()=>setFocusTitle(null)} to={`/products/${product.listing_id}`}>
  <div className="listingImage"style={{backgroundImage: `url("${product.MainImage.url_fullxfull}")`,}}></div>
 <div className="productInfo">

  <div className="title">{`${product.title.slice(0,((focusTitle === product.listing_id) ? 50 : 30))}...`}</div>

  <div className="prices">{"$" + product.price}</div>
  <div className="seeMore">Click to see more</div>
 </div>
</Link>
        ))}
      </div>
    );
}
