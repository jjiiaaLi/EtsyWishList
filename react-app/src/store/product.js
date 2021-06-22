
const LOAD_PRODUCTS="product/LOAD_PRODUCTS"
const LOAD_SINGLE_PRODUCT="product/LOAD_SINGLE_PRODUCT"
//action

const loadProducts=(products)=>({
    type: LOAD_PRODUCTS,
    products: products,
})

const loadSingleProductAction=(product)=>({
    type: LOAD_SINGLE_PRODUCT,
    product:product,
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
        // console.log(data)
        dispatch(loadSingleProductAction(data.results[0]))
        
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
        default:
            return state;
    }
}