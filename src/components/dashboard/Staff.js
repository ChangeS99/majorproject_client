import {useEffect} from 'react';
import Search from "./Search"

//axios
import server from '../../axiosConfig';

//styles

const Staff = () => {

    useEffect(() => {
        server.post("/hospital/staff/list", {})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response.data.error);
        })
    }, [])

    return (
        <div>
            <Search />
           Staff list
        </div>
    )
}

export default Staff;