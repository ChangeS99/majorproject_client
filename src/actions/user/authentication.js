import server from '../../axiosConfig';

export const signupUser = (activationToken) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            const result = await server.post("/auth/signin", {
                token: activationToken
            });

            if(result.data.error) {
                throw new Error(result.data.error);
            }

            const {token, user, message} = result.data;
            localStorage.setItem('user', token);
            dispatch({
                type: "USER_AUTH",
                payload: {
                    ...user,
                    message
                }
            });

            resolve(result.data);
        } catch (error) {
            if(error.response.data){
                reject(error.response.data.error);
            }
            reject("Network error");
        }
    })
}

export const signinUser = ({email, password} = {}) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            const result = await server.post("/auth/signin", {
                email,
                password
            });

            if(result.data.error) {
                throw new Error(result.data.error);
            }

            const {token, user, message} = result.data;
            localStorage.setItem('user', token);
            dispatch({
                type: "USER_AUTH",
                payload: {
                    ...user,
                    message
                }
            });

            resolve(result.data);
        } catch (error) {
            reject(error.response.data.error);
        }
    })
}

export const reSigninUser = (client_token) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            
            const result = await server.post("/auth/resignin", {
                token: client_token
            });

            if(result.data.error) {
                throw new Error(result.data.error);
            }

            const {token, user, message} = result.data;
            localStorage.setItem('user', token);

            dispatch({
                type: "USER_AUTH",
                payload: {
                    ...user,
                    message
                }
            });

            resolve({
                signedIn: true,
                message
            })
            
        } catch (error) {
            console.log(error);
            if(error.response){
                reject({
                    message: error.response.data.error,
                    signedIn: false
                });
            }
            reject("Network error");
           
        }
    })
}

export const activateUser = (user_data) => {
    return dispatch => new Promise(async (resolve) => {
        
        const {token, user, message} = user_data;

        localStorage.setItem('user', token);
        dispatch({
            type: "USER_AUTH",
            payload: {
                ...user, 
                message
            }
        })
        resolve(message);
    });
}

export const signoutUser = () => {
    return dispatch => new Promise((resolve, reject) => {
        
    })
}

