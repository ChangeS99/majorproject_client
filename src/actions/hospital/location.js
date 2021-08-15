// import server from '../../axiosConfig';

export const registerLocation = (data) => {
    return {
        type: "SET_LOCATION",
        payload: data
    }
}

export const placeMarker = (data) => {
    return {
        type: "SET_MARKER",
        payload: data
    }
}

export const resetMarker = () => {
    return {
        type: "RESET_MARKER"
    }
}