export const setBackdrop = (show, info) => dispatch => {
    dispatch({
        type: "SET_BACKDROP",
        payload: {
           show,
           info
        }
    })
}

export const setInfo = (type, info) => dispatch => {
    switch(type) {
        case "patient":  dispatch({
            type: "SET_PATIENT_INFO",
            payload: {
                ...info
            }
        }); break;
        case "employee": dispatch({
            type: "SET_EMPLOYEE_INFO",
            payload: {
                ...info
            }
        }); break;
        default: return;
    }
   
}