import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import server from '../../../axiosConfig';

const AdminActivate = ({token}) => {
    const history = useHistory();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        server.post("/hospital/admin/activate/verify", {
            token
        })
        .then(response => {
            if(response.data.exist) {
                server.post("/hospital/admin/activate", {
                    token,
                })
                .then(response => {
                    console.log(response.data);
                    setError(null);
                    history.push("/");         
                })
                .catch(error => {
                    if(error.response) {
                        setError(error.response.data.error)
                    } else {
                        setError("Network error.")
                    }
                })
            }
            setEmail(response.data.email)
            setError(null);
            // history.push("/");
            
        })
        .catch(error => {
            if(error.response) {
                setError(error.response.data.error)
            } else {
                setError("Network error.")
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e, type) => {
        const value = e.target.value;
        switch(type) {
            case "username": setUsername(value); break;
            case "password": setPassword(value); break;
            default: return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        server.post("/hospital/admin/activate", {
            token,
            username,
            email,
            password
        })
        .then(response => {
            console.log(response.data);
            setError(null);
            history.push("/");
            
        })
        .catch(error => {
            if(error.response) {
                setError(error.response.data.error)
            } else {
                setError("Network error.")
            }
        })
    }
    
    return (
        <div>
            {
                error ? <h1>{error}</h1> : 
                <div>
                    <form>
                        <div>
                            <label>username: </label>
                            <input
                            onChange={(e) => onChangeHandler(e, "username")} 
                            value={username}
                            type="text" />
                            <label>email: </label>
                            <input value={email} disabled type="email" />
                            <label>password: </label>
                            <input 
                            onChange={(e) => onChangeHandler(e, "password")} 
                            value={password}
                            type="password" />
                        </div>
                        <div>
                            <button onClick={submitHandler}>Submit</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default AdminActivate;