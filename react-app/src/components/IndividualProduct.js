import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';


export default function IndividualProduct(){
    const {listingId}=useParams();

    console.log(useParams())
    return (
        <h1>{listingId}</h1>
    )
}