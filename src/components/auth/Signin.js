import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { toast } from 'react-toastify';

// redux
import { connect } from 'react-redux';

// actions
import {
    signinUser
} from '../../actions/user/authentication';
import {
    setHospital
} from '../../actions/hospital/information';

//validation
import {
    userSigninValidator
} from '../../validators/auth';

// styles
import { SignInCont } from '../../style/container';
import { AuthForm } from '../../style/auth/auth__styles';
import { SubmitButton } from '../../style/button';


const Signin = ({ user, signinUser, setHospital }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorObj, setErrorObj] = useState("");

    const history = useHistory();

    const handleInputChange = (event, field) => {
        switch (field) {
            case "email": setEmail(event.target.value); break;
            case "password": setPassword(event.target.value); break;
            default: return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const isValidated = userSigninValidator({ email, password });
        if (isValidated.error) {
            setErrorObj(isValidated);
        } else {
            signinUser({ email, password })
                .then(_ => {
                    setErrorObj({})
                    setHospital()
                    .then(_ => {
                        history.replace("/");
                    })
                    .catch(_ => {
                        history.replace("/");
                    })
                    
                })
                .catch(error => {
                    // console.log(error);
                    toast.error(error);
                    setErrorObj({ error });
                });
        }
    }

    const particularTypeError = (name) => {
        return name === errorObj.path ? <p className="error">{errorObj.error}</p> : null
    }

    return (
        <SignInCont>
            <div className="heading">
                <h1>Sign in</h1>
            </div>
            <AuthForm>
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
                        className="button_submit"
                        onClick={submitHandler}
                        type="submit">
                        Submit
                    </SubmitButton>
                </div>
            </AuthForm>
            <div>
                <Link to="/auth/signup">don't have one, create now.</Link>
            </div>
        </SignInCont>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {
    signinUser,
    setHospital
})(Signin);