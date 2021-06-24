//variables

const GET_FRIENDS='friends/GET_FRIENDS'


//action

const getFriend=(friend)=>({
    type:GET_FRIENDS,
    friend:friend,
})


//thunk

export const loadFriend=(friendsArray)=>async(dispatch)=>{
    friendsArray.forEach(async(friendId)=>{
        const res=await fetch(`/api/users/${Number(friendId)}`)
        if (res.ok){
            const data=await res.json()
            dispatch(getFriend(data))
        }
    })
}


export default function friendsReducer(state={},action){
    let newState={}
    switch (action.type){
        case GET_FRIENDS:
            newState={...state}
            newState[action.friend.id]=action.friend
            return newState
        default:
            return state
    }


}





