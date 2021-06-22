import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';
import { loadSingleProduct } from "../store/product";
import './IndividualProduct.css'


export default function IndividualProduct(){
    
    const history = useHistory();
    const {listingId}=useParams();
    
    const dispatch = useDispatch();
    
    useEffect(() => {  
         
        dispatch(loadSingleProduct(listingId));
    }, [dispatch]);

    const product = useSelector((state) => Object.values(state.product));
    
    const descFunc = (desc) => {
      if (desc.length > 100) {
        const res = desc.slice(0, 100);
        return(res);
      }
    };

    const truncDesc = descFunc(product[0]?.description);

    const [desc, setDesc] = useState(truncDesc);

    const titleFunc=(title)=>{
        if (title.length>30){
            
            return title.slice(0,30)+'...'
        }
        else{
            return title
        }
    }
    const productTitle = titleFunc(product[0]?.title);

    
    const Back = (e)=>{
        e.preventDefault()
        
        history.push('/products')
    }
    

    const selectWishList= async(e) =>{
        e.preventDefault()
        return null;
    }

    const showFullDesc=(e)=>{
        e.preventDefault()
        setDesc(product[0].description)
    }
    
    if(!product){
        return (<h3>Loading...</h3>)
    }
    return (
      <div>
        <button className='Back' onClick={Back}> Back </button>  
        <div className="individualProductDiv">
          <img
            className="individualImage"
            src={product[0]?.MainImage.url_fullxfull}
          />
          <p>{productTitle}</p>
          <p>{`$ ${product[0]?.price}`}</p>
          <p>
            {desc}
            <button className="dotdotdotbtn" onClick={showFullDesc}>
              ...
            </button>
          </p>
          <button onClick={selectWishList}>Add To Wish List</button>
        </div>
      </div>
    );
 
}