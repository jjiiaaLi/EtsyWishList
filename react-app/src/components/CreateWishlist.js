import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {createWishlist} from '../store/wishLists';
import "./createWishListStyle.css"
export default function CreateWishlist(props){
    const { show, closeModal } = props;
    const [name, setName]=useState('')
    const user = useSelector(state=>Object.values(state.session))
    const user_id=user[0]["id"]
    const dispatch=useDispatch()


    const createNewWishlist=async(e)=>{
        e.preventDefault();

        const newWishlist= await dispatch(createWishlist(user_id,name))
        window.location.reload()
    }

    return (
        <>
        <div className={show ? "overlay" : "hide"} onClick={closeModal} />
        <div className={show ? "modal" : "hide"}>
          <button id="close" onClick={closeModal}>X</button>
        <form className='createWishlistForm' onSubmit={createNewWishlist}>
            <div className="listFormTitle"> Create Wish List</div>
            <div className='wishlistNameInputDiv'>
                <label>Name</label>
                <input value={name} onChange={e=>{setName(e.target.value)}} required={true}/>
            </div>
            <div className="buttonContainer">
            <button className="button" onClick={closeModal} type="submit">Create</button>
       </div>
       </form>
        </div>
        </>
    )
}
