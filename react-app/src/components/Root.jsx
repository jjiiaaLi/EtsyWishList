import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Root.css'



export default function Root(){
    return(
        <div className='rootPageDiv'>
            <p>Don't Have An Account?</p>
            <Link to='sign-up'>Create New Account</Link>
            <p>Join the Wishlist Community!</p>
        </div>

    )
}