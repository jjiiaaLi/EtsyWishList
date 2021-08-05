import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory} from "react-router-dom";
import {
  getWishlistItems,
  removeProductFromWishlist,
  clearProducts,
} from "../store/product";
import Footer from './Footer'
import "./IndividualWishlist.css";


export default function IndividualWishlist() {
  const history=useHistory()
  
  
  const { wishlistId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => Object.values(state.product));
  const currentUser=useSelector(state=>state.session.user)
  let userId

 

  useEffect(() => {
    dispatch(getWishlistItems(wishlistId));
    return () => dispatch(clearProducts());
  }, [dispatch,wishlistId]);

  if (!(useSelector(state=>state.session.user))){
    history.push('/')
    
  }
  else{
    userId=currentUser.id
  }

  

  const removeItem = async (e) => {
    e.preventDefault();
    await dispatch(removeProductFromWishlist(e.target.value));
    window.location.reload();
  };

  const openInNewTab = (e) => {
    e.preventDefault();
    const newWindow = window.open(
      `http://etsy.com/listing/${e.target.value}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  
  return (
    
    <div className="wishlistContainer">
      {products.map((product) => (
        <div className="productCardWL" key={product?.name} style={{ backgroundImage: `url("${product.image_url}")` }}>
          <div className="productTitle">{product?.name?.slice(0, 20)}...</div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
            <div className="productPrice">${product?.price}</div>
          <div className="productButtonContainer">
            {wishlistId==userId&&<button className="button"  value={product?.id} onClick={removeItem}>
              Remove
            </button>}
            <button
              className="button"
              value={product?.product_id}
              onClick={openInNewTab}
            >
              View in Etsy
            </button>
          </div>
        </div>
      ))}
      <Footer/>
    </div>
  );
}
