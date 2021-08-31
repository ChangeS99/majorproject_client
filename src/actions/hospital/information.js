import server from '../../axiosConfig';

export const activateHospitalData = (token, data, marker) => {
    return dispatch => new Promise((resolve, reject) => {
        server.post("/hospital/register/activate", {
            token,
            data: {
                ...data,
                ...marker
            }
        })
            .then(response => {
                dispatch({
                    type: "SET_HOSPITAL",
                    payload: response.data.hospital
                })
                resolve({
                    message: response.data.message
                })
            })
            .catch(error => {

                if (error.response) {
                    reject({
                        error: error.response.data.error,
                        path: "server"
                    })
                }
            })
    })
}

export const setHospital = () => dispatch => new Promise((resolve, reject) => {
    server.post("/hospital/resignin", {})
        .then(response => {
            dispatch({
                type: "SET_HOSPITAL",
                payload: response.data.hospital
            })
            resolve(response.data.hospital);
        }).catch(error => {
            if (error.response) {
                reject(error.response.data.error)
            } else {
                reject("Network error")
            }
        })
});

export const signinHospital = (data) => dispatch => new Promise((resolve, reject) => {
    server.post("/hospital/signin", {
        ...data
    })
        .then(response => {
            dispatch({
                type: "SET_HOSPITAL",
                payload: response.data.hospital
            })
            resolve("hospital signed in successfully")
        })
        .catch(error => {
            if (error.response) {
                reject(error.response.data.error)
            } else {
                reject("Network error")
            }
        })
})

export const setDetailHospital = () => dispatch => new Promise((resolve, reject) => {
    server.post("/hospital/detail", {
    })
        .then(response => {
            dispatch({
                type: "SET_HOSPITAL",
                payload: response.data.hospital
            })
            resolve("No error")
        })
        .catch(error => {
            if (error.response) {
                reject(error.response.data.error)
            } else {
                reject("Network error")
            }
        })
})

export const setSearchResult = (data) => dispatch => {
    dispatch({
        type: "SEARCH_RESULT",
        payload: data
    })
}

export const updateSearchResult = (result, data) => dispatch => {

    const modify = result.filter(item => item._id !== data._id);
    const newResult = [...modify, {...data}];

    dispatch({
        type: "SEARCH_RESULT",
        payload: newResult
    })
}

export const removeItemSearchResult = (data, rmv) => dispatch => {
    const newData = data.filter(item => item._id !== rmv._id);
    dispatch({
        type: "SEARCH_RESULT",
        payload: newData
    })
}

export const setRoles = (data) => dispatch => {
    dispatch({
        type: "SET_ROLE",
        payload: data
    })
}

export const setDeps = (data) => dispatch => {
    dispatch({
        type: "SET_DEP",
        payload: data
    })
}

export const removeRole = (data, newData) => dispatch => {
    dispatch({
        type: "SET_ROLE",
        payload: newData
    })
}

export const removeDep = (data, newData) => dispatch => {
    dispatch({
        type: "SET_DEP",
        payload: newData
    })
}

export const setAnnouncement = (data) => dispatch => {
    dispatch({
        type: "SET_ANN",
        payload: data
    })
}

export const removeAnnouncement = (data) => dispatch => {
    dispatch({
        type: "SET_ANN",
        payload: data
    })
}

export const emptyAnnouncement = (data) => dispatch => {
    dispatch({
        type: "SET_ANN",
        payload: []
    })
}

export const setFloor = (data) => dispatch => {
    dispatch({
        type: "SET_FLOOR",
        payload: data
    })
}

export const setRoom = (data) => dispatch => {
    dispatch({
        type: "SET_ROOM",
        payload: data
    })
}
