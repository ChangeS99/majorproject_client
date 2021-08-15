import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {connect} from 'react-redux';

import server from '../../axiosConfig';

import {activateUser} from '../../actions/user/authentication';

const Activate = ({token, activateUser}) => {

    const history = useHistory()

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        server.post("/auth/account-activation", {
            token
        }).then(response => {
            return activateUser(response.data)
        })
        .then(data => {
            setLoading(false);
            setMessage(data);
            history.replace("/");
        })
        .catch(error => {
            setError(error.response.data.error);
            setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>{
            loading ? <p>Loading...</p>
        :
            <div>In activate js
            
                <p>{error}</p>
                <p>{token}</p>
                <p>{message}</p>
        

            </div>  
        }
            
        </div>
    )
}

export default connect(null, {
    activateUser
})(Activate);





