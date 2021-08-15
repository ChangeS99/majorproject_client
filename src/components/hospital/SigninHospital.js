import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

import {
    signinHospital
} from '../../actions/hospital/information';

const SigninHospital = ({signinHospital}) => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        switch(type) {
            case "email": setEmail(value); break;
            case "password": setPassword(value); break;
            default: return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        signinHospital({email, password})
        .then(result => {
            history.push("/");
        })
        .catch(error => {
            toast.error(error)
        })
    }

    return (
        <div>
            <form>
                <div>
                    Sign in Hospital
                </div>
                <div>
                    <label>email: </label>
                    <input
                    onChange={(e) => handleInputChange(e, "email")} 
                    type="email"></input>
                    <label>password: </label>
                    <input 
                    onChange={(e) => handleInputChange(e, "password")} 
                    type="password"></input>
                </div>
                <button onClick={submitHandler}>Sign in</button>
            </form>
        </div>
    )
}

export default connect(null, {
    signinHospital
})(SigninHospital);