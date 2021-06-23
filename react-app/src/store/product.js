
const LOAD_PRODUCTS="product/LOAD_PRODUCTS"
const LOAD_SINGLE_PRODUCT="product/LOAD_SINGLE_PRODUCT"
const SEARCH_PRODUCTS="product/SEARCH_PRODUCTS"
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

//thunk

export const loadAllProducts=()=>async(dispatch)=>{
    const res=await fetch('/api/products')

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

    const res=await fetch(`/api/products/${listingId}`)

    if(res.ok){
        const data= await res.json()

        dispatch(loadSingleProductAction(data.results[0]))

    }
}

export const searchProducts = (tags) => async(dispatch) => {
    const res = await fetch(`/api/search/${tags}`)
    
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
        default:
            return state;
    }
}
