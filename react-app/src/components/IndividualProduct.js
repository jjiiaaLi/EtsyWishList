import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';
import { loadSingleProduct } from "../store/product";
import "./context/Modal.css";
import AddToWishList from "./AddToWishlist";
import './IndividualProduct.css'


export default function IndividualProduct(){
  const dispatch = useDispatch();
  const history = useHistory();
  const {listingId}=useParams();
  
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  

  useEffect(() => {
      
      dispatch(loadSingleProduct(listingId));
  }, [dispatch]);

  const product = useSelector((state) => Object.values(state.product));

  const Back = (e)=>{
        e.preventDefault()
        history.push('/products')
  }

  const selectWishList= async(e) =>{
        e.preventDefault()
        return null;
  }


  const descFunc = (desc) => {
    const res = desc?.slice(0, 75);
    return(res);
  };

  const truncDesc = descFunc(product[0]?.description);

  const [desc, setDesc] = useState(truncDesc);
    const showFullDesc=(e)=>{
      e.preventDefault()
      desc === truncDesc ? setDesc(product[0].description) : setDesc(truncDesc)
  }

  const openInNewTab = () => {
      const newWindow = window.open(product[0]?.url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
  }



    return (
      <div className="indivProductContainer">
        <button className="Back" onClick={Back}>
          {" "}
          Back{" "}
        </button>
        <div className="productCardContainer">
          <div className="individualProductDiv">
            <div className="indivTitle indivInfo">
              {product[0]?.title.slice(0, 60)}
            </div>
            <img
              className="individualImage"
              src={product[0]?.MainImage.url_fullxfull}
            />

            <div className="indivInfo">{`Price: $${product[0]?.price}`}</div>
            <div className="indivInfo">
              {desc}
              <button className="dotdotdotbtn" onClick={showFullDesc}>
                ...
              </button>
            </div>

            <div className="indivButtonsContainer">
              {!show && (
                <button className="button" onClick={openModal}>
                  Add to Wishlist
                </button>
              )}
              <AddToWishList closeModal={closeModal} show={show} />

              <button className="button" onClick={openInNewTab}>
                View in Etsy
              </button>
            </div>
          </div>
        </div>
      </div>
    );

}
