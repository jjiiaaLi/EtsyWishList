
const LOAD_PRODUCTS="product/LOAD_PRODUCTS"
const LOAD_SINGLE_PRODUCT="product/LOAD_SINGLE_PRODUCT"
const SEARCH_PRODUCTS="product/SEARCH_PRODUCTS"
const WISHLIST_PRODUCTS="product/WISHLIST_PRODUCTS"
const CLEAR_PRODUCTS="product/CLEAR_PRODUCTS"
//action

const loadProducts=(products)=>({
    type: LOAD_PRODUCTS,
    products: products,
})

const loadSingleProductAction=(product)=>({
    type: LOAD_SINGLE_PRODUCT,
    product:product,
})

const searchProductsAction=(products)=>({
    type: SEARCH_PRODUCTS,
    products:products,
})

const loadWishlistProducts=(products)=>({
    type: WISHLIST_PRODUCTS,
    products:products,
})

export const clearProducts=()=>({
    type:CLEAR_PRODUCTS,

})
//thunk

export const loadAllProducts=()=>async(dispatch)=>{
    const res=await fetch('/api/products/')

    if (res.ok){
        const data= await res.json()
        const filteredData=data.results.filter(product=>{
            if (product.MainImage !== undefined && product.price !== undefined){
                return product
            }
        })
        dispatch(loadProducts(filteredData))
    }

}


export const loadSingleProduct=(listingId)=>async(dispatch)=>{
    
    const res=await fetch(`/api/products/${listingId}/`)

    if(res.ok){
        const data= await res.json()

        dispatch(loadSingleProductAction(data.results[0]))

    }
}

export const searchProducts = (tags) => async(dispatch) => {
    const res = await fetch(`/api/search/${tags}/`)
    
    if (res.ok) {
        const data = await res.json()
        const filteredData = data.results.filter(product => {
            if (product.MainImage !== undefined && product.price !== undefined) {
                return product
            }
        })
        dispatch(searchProductsAction(filteredData))
    }
}


export const getWishlistItems = (wishlistId) => async (dispatch) => {
  const res = await fetch(`/api/wishlists/getItems/${wishlistId}`);

  if (res.ok) {
    const data = await res.json();
   
    dispatch(loadWishlistProducts(data));
  }
};


export const removeProductFromWishlist=(product_id)=> async(dispatch)=>{
    const res = await fetch(`/api/wishlists/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(res.ok)return
}

//reducer

export default function productReducer(state={}, action){
    let newState={}
    switch(action.type){
        case LOAD_PRODUCTS:
            newState={...state}
            action.products.forEach(product=>{
                newState[product["listing_id"]]=product
            })

            return newState
        case LOAD_SINGLE_PRODUCT:
            
            newState[action.product.listing_id]=action.product;
            return newState;
        case SEARCH_PRODUCTS:
            action.products.forEach(product => {
                newState[product['listing_id']]=product
            })
            return newState
        case WISHLIST_PRODUCTS:
            action.products.products.forEach(product=>{
                newState[product['product_id']]=product
            })
            return newState
        case CLEAR_PRODUCTS:
            return newState
        default:
            return state;
    }
}
