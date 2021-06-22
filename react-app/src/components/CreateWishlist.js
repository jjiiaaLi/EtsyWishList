import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import {createWishlist} from '../store/wishLists';

export default function CreateWishlist(){
    const [name, setName]=useState('')
    const [bought, setBought]= useState('')
    const user = useSelector(state=>Object.values(state.session))
    const user_id=user[0]["id"]
    const dispatch=useDispatch()
    const history=useHistory()
    
    const createNewWishlist=async(e)=>{
        e.preventDefault();
        
        const newWishlist= await dispatch(createWishlist(user_id,name,bought))
        history.push('/')
    }

    return (
        <form className='createWishlistForm' onSubmit={createNewWishlist}>
            <div className='wishlistNameInputDiv'>
                <label>Name</label>
                <input value={name} onChange={e=>{setName(e.target.value)}} required={true}/>
            </div>
            <button type="submit">Create</button>
        </form>
    )
}