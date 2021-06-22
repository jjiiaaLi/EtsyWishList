//variables

const GET_WISHLISTS='wishlists/GET_WISHLISTS'

const ADD_WISHLIST='wishlists/ADD_WISHLIST'

//action

const getWishLists=(wishlists)=>({
    type:GET_WISHLISTS,
    wishlists:wishlists,
})

const addWishlist=(wishlist)=>({
    type:ADD_WISHLIST,
    wishlist:wishlist,
})
//thunks

export const loadWishlists=(userId)=> async (dispatch)=>{
    const res= await fetch(`/api/wishlists/${userId}`)

    if(res.ok){
        const data= await res.json()
        dispatch(getWishLists(data))
    }
}

export const createWishlist=(user_id,name)=> async(dispatch)=>{
    console.log(user_id)
    console.log(name)
    const res= await fetch('/api/wishlists',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id,name})
    })
    if(res.ok){
        console.log('returned to the front end')
    }
}


export default function WishlistReducer(state={}, action){
    const newState={}
    switch(action.type){
        case GET_WISHLISTS:
            action.wishlists.forEach(wishlist=>{
                newState[wishlist.id]=wishlist
            })
            return newState
        default:
            return state
    }
}
