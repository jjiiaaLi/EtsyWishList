import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import {createWishlist} from '../store/wishLists';

export default function CreateWishlist(props){
    const { show, closeModal } = props;
    const [name, setName]=useState('')
    const user = useSelector(state=>Object.values(state.session))
    const user_id=user[0]["id"]
    const dispatch=useDispatch()
    const history=useHistory()
    const createWishlist=async(e)=>{
        e.preventDefault();
        
        await dispatch(createWishlist(user_id,name))
        history.push('/')
    }

    return (
        <>
        <div className={show ? "overlay" : "hide"} onClick={closeModal} />
        <div className={show ? "modal" : "hide"}>
          <button id="close" onClick={closeModal}>X</button>
        <form className='createWishlistForm' onSubmit={createWishlist}>
            <div className='wishlistNameInputDiv'>
                <label>Name</label>
                <input value={name} onChange={e=>{setName(e.target.value)}} required={true}/>
            </div>
            <button type="submit">Create</button>
        </form>
        </div>
        </>
    )
}