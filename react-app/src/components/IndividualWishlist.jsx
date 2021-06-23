import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';


export default function IndividualWishlist(){
    const {wishlistId}=useParams()
    const dispatch=useDispatch()
    
    useEffect(()=>{
        
    },[dispatch])

    return (
        <div className='wishlistContainer'>

        </div>
    )
}