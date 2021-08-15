import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// import axios from 'axios';

import server from '../../axiosConfig';

function PrivateRoute({ children, ...rest }) {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            server.post("/user/normal/verify", {
                role: "normal",
                type: "account"
            }).then(response => {
                setAuth(true);
                setLoading(false);
            }).catch(err => {
                setAuth(false);
                setLoading(false);
                // console.log(err.response.data);
            })
        }, 2000)

    }, []);

    const check = (location) => {
        if (loading) {
            return <h1>Loading in private</h1>
        } else {
            if (auth) {
                return children
            } else {
                // return <h1>Not Authorized</h1>
                return (
                    <Redirect
                        to={{
                            pathname: "/auth/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        }
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                check(location)
            }
        />
    );
}

export default PrivateRoute;