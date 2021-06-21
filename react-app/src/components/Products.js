import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadAllProducts} from "../store/product";

export default function Products(){
    const products= useSelector(state=>Object.values(state.product))
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllProducts())
    },[dispatch])

    return (
        <div className='products'>
            <h1>HElLo</h1>
        </div>

    );
}


