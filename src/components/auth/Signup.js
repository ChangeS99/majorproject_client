import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// redux
// import { connect } from 'react-redux';
import { toast } from 'react-toastify';

// actions
// import {
//     signinUser
// } from '../../actions/user/authentication';

//validation
import {
    userSignupValidator
} from '../../validators/auth';

import server from '../../axiosConfig';

//styles
import { SignupCont } from '../../style/container';
import { AuthForm } from '../../style/auth/auth__styles';
import { SubmitButton } from '../../style/button';


const Signup = ({ user, signInUser }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorObj, setErrorObj] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState("");
    // const history = useHistory();

    const handleInputChange = (event, field) => {

        const value = event.target.value;

        switch (field) {
            case "username": setUsername(value); break;
            case "email": setEmail(value); break;
            case "password": setPassword(value); break;
            default: return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const isValidated = userSignupValidator({ username, email, password });
        if (isValidated.error) {
            setErrorObj(isValidated);
        } else {
            server.post("/auth/signup", {
                username,
                email,
                password
            }).then(response => {
                const result = response.data;
                setMessage(result.message);
                toast.success(result.message);
            }).catch(error => {
                const err = error.response.data
                setErrorObj(err);;
                if (err.path === "temp") {
                    toast.error(err.error);
                }
            });
        }
    }

    const particularTypeError = (name) => {
        return name === errorObj.path ? <p className="error">{errorObj.error}</p> : null
    }

    return (
        <SignupCont>
            <div className="heading">
                <h1>Sign up</h1>
            </div>

            <AuthForm>
                <div className="formComponent">
                    {particularTypeError("username")}
                    <div className="input">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => handleInputChange(e, "username")}
                            type="text"
                            value={username}
                            name="username"
                            id="username">
                        </input>
                    </div>
                </div>
                <div className="formComponent">
                    {particularTypeError("email")}
                    <div className="input">
                        <label htmlFor="email">email</label>
                        <input
                            onChange={(e) => handleInputChange(e, "email")}
                            type="email"
                            value={email}
                            name="email"
                            id="email">
                        </input>
                    </div>
                </div>
                <div className="formComponent">
                    {particularTypeError("password")}
                    <div className="input">
                        <label htmlFor="password">password</label>
                        <input
                            onChange={(e) => handleInputChange(e, "password")}
                            type="password"
                            value={password}
                            name="email"
                            id="password">
                        </input>
                    </div>
                </div>
                <div className="formComponent">
                    <SubmitButton
                        onClick={submitHandler}
                        type="submit" >
                        Submit
                    </SubmitButton>
                </div>
            </AuthForm>
        </SignupCont>
    );
}

export default Signup;