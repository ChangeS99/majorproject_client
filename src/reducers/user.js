export const userReducer = (user = {}, action) => {
    switch(action.type) {
        case 'USER_AUTH': return action.payload
        default: return user
    }
}