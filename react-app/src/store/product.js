
const LOAD_PRODUCTS="product/LOAD_PRODUCTS"

//action

const loadProducts=(products)=>({
    type: LOAD_PRODUCTS,
    products: products,
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


//reducer

export default function productReducer(state={}, action){
    let newState={}
    switch(action.type){
        case LOAD_PRODUCTS:
            newState={}
            
            action.products.forEach(product=>{
                newState[product["listing_id"]]=product
            })
            return newState
        default:
            return state;
    }
}