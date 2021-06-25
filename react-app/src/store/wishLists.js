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

export const createWishlist=(user_id,name)=> async(dispatch)=>{
    
    const res= await fetch('/api/wishlists/createNew',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            name,
            
        })
    })
    if(res.ok)return
}


export const editWishlist =
  (listing_id, wishlist_id, title, image_url, price) => async (dispatch) => {
    const res = await fetch("/api/wishlists/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listing_id,
        wishlist_id,
        title,
        image_url,
        price
      }),

    });
    if(res.ok)return
  };





export default function WishlistReducer(state={}, action){
    const newState={}
    switch(action.type){
        case GET_WISHLISTS:
            action.wishlists.wishlists.forEach(wishlist=>{
                newState[wishlist.id]=wishlist
            })
            return newState
        default:
            return state
    }
}

