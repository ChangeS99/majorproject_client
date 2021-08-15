import axios from 'axios';


const backend = process.env.REACT_APP_API;

const instance = axios.create({
    withCredentials: true,
    baseURL: `${backend}`
});

export default instance;