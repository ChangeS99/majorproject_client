export const backdropReducer = (backdrop={show: false, info: {for: "none"}}, action) => {
    switch(action.type) {
        case "SET_BACKDROP": return {...action.payload};
        default: return backdrop;
    }
}

export const infoReducer = (info = {}, action ) => {
    switch(action.type) {
        case "SET_PATIENT_INFO": return {...action.payload};
        case "SET_EMPLOYEE_INFO": return {...action.payload};
        case "SET_NONE_INFO": return {};
        default: return info;
    }
}