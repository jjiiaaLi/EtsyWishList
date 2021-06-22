//variables

const GET_WISHLISTS='wishlists/GET_WISHLISTS'



//action

const getWishLists=(wishlists)=>({
    type:GET_WISHLISTS,
    wishlists:wishlists,
})


//thunks

export const loadWishlists=(userId)=> async (dispatch)=>{
    const res= await fetch(`/api/wishlists/${userId}`)

    if(res.ok){
        const data= await res.json()
        dispatch(getWishLists(data))
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

