export const locationReducer = (location={}, action) => {
    switch(action.type) {
        case "SET_LOCATION": return {...location, ...action.payload};
        default: return location;     
    }
}

export const markerReducer = (marker = {}, action) => {
    switch(action.type) {
        case "SET_MARKER": return {...marker, ...action.payload};
        case "RESET_MARKER": return {};
        default: return marker
    }
}