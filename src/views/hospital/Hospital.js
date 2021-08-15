import {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';

import server from '../../axiosConfig';

//component
import Register from '../../components/hospital/Register';
import Configure from '../../components/hospital/Configure';
import AdminActivate from '../../components/dashboard/components/AdminActivate'

//styles
import { HospitalContainer } from '../../style/container';
import SigninHospital from '../../components/hospital/SigninHospital';

const Hospital = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const {token, hospitalMode, activateToken} = useParams();

    useEffect(() => {
        server.post("/user/normal/verify", {
            role: "normal",
            type: "account"
        })
        .then(response => {
            console.log(response.data);
            setLoading(false);
            setError(null);
        })
        .catch(error => {
            setLoading(false);
            if(error.response) {
                setError(error.response.data.error)
            } else {
                setError("Network error");
            }
            
        })
            
    },[])

    const verifiedRender = () => {
        // console.log(location);
        // console.log(token);

        // if(activateToken){
        //     return RenderComponent();
        // }

        if(loading) {
            return <h1> loading</h1>
        } else if(error) {
            return <h1>{error}</h1>
        } else {
            return RenderComponent();
        }
    }

    const RenderComponent = () => {
        console.log(location);
        // switch(location.pathname) {
        //     case "/hospital/register": return <Register />;
        //     case "/hospital/register/configure/"
        // }

        if(token) {
            return <Configure token={token} />
        } else {
            if(hospitalMode === "signin") {
                return <SigninHospital />
            } else if(hospitalMode === "admin" && activateToken) {
                return <AdminActivate token={activateToken}/>
            } else {
                return <Register />
            }        
        }
    }

    return (
        <HospitalContainer>
            {verifiedRender()}
        </HospitalContainer>
    );
}

export default Hospital