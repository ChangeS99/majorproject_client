import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

//validator
import { hospitalRegisterValidator } from '../../validators/hospital';
import { particularTypeError } from '../../validators';

import server from '../../axiosConfig';

//styles
import { AuthForm } from '../../style/auth/auth__styles';
import { RegisterCont } from '../../style/hospital/hospital__styles';
import { SubmitButton } from '../../style/button';


const Register = () => {

    const [email, setEmail] = useState("");
    const [hospitalEmail, setHospitalEmail] = useState("");
    const [errorObj, setErrorObj] = useState("");
    // const particularTypeError = (name) => {
    //     return name === errorObj.type ? <p>error: {errorObj.error}</p>: null
    // }

    const handleInputChange = (event, field) => {
        switch (field) {
            case "email": setEmail(event.target.value); break;
            case "hospitalEmail": setHospitalEmail(event.target.value); break;
            default: return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const isValidated = hospitalRegisterValidator({ email, hospitalEmail });
        if (isValidated.error) {
            setErrorObj(isValidated);
        } else {
            server.post("/hospital/register", {
                email, hospitalEmail
            }).then(response => {
                console.log(response.data);
                toast.success(response.data.message);
            }).catch(error => {
                if (error.response) {
                    setErrorObj({
                        error: error.response.data.error,
                        path: "network"
                    });

                    toast.error(error.response.data.error);
                } else {
                    toast.error("Server error, please try again.");
                    setErrorObj({
                        error: "Server error, please try again.",
                        path: "server"
                    })
                }
            })
        }
    }

    // const particularTypeError = (name) => {
    //     return name === errorObj.path ? <p>error: {errorObj.error}</p>: null
    // }

    return (
        <RegisterCont>
            <div className="heading_register">
                <h1>Register</h1>
            </div>
            <div className="instruction_register">
                <p>Enter an email which will
                    act as an admin account for the hospital.
                    Please make sure that an account is created
                    with that email first on this platform.
                    Also give an official email for the hospital
                    where the activation link will be sent.
                </p>
            </div>
            <AuthForm>
                <div className="formComponent">
                    {particularTypeError(errorObj, "email")}
                    <div className="input">
                        <label htmlFor="email">email</label>
                        <input
                            onChange={(e) => handleInputChange(e, "email")}
                            type="email"
                            id="email"
                            name="email" />
                    </div>
                </div>
                <div className="formComponent">
                    {particularTypeError(errorObj, "hospitalEmail")}
                    <div className="input">
                        <label htmlFor="hospital-email">hospital email</label>
                        <input
                            onChange={(e) => handleInputChange(e, "hospitalEmail")}
                            type="email"
                            id="hospital-email"
                            name="hospital-email" />
                    </div>
                </div>
                <div className="formComponent">
                    <SubmitButton onClick={submitHandler}>Submit</SubmitButton>
                </div>
                <div>
                    <Link to="/hospital/signin">already registerd? Sign in</Link>
                </div>
            </AuthForm>
        </RegisterCont>
    )
}

export default Register;


