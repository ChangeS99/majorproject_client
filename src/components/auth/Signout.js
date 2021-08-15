import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {
    connect
} from 'react-redux'

import {
    signoutUser
} from '../../actions/user/authentication';

const Signout = () => {

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

    }, [])

    return (
        <div>
            Signing out
        </div>
    )
}

export default connect(signoutUser)(Signout);