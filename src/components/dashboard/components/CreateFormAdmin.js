import { useState } from 'react';

import { toast } from 'react-toastify';

//validation
import {
    emailCheck
} from '../../../validators/auth';

import server from '../../../axiosConfig';

//styles
import { AdminCreateCont } from '../../../style/container';
import { AuthForm } from '../../../style/auth/auth__styles';
import { SubmitButton } from '../../../style/button';

const CreateFormAdmin = () => {

    const [email, setEmail] = useState("");

    const [errorObj, setErrorObj] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [message, setMessage] = useState("");
    // const history = useHistory();

    const handleInputChange = (event, field) => {

        const value = event.target.value;

        switch (field) {
            case "email": setEmail(value); break;
            default: return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const isValidated = emailCheck({email });
        if (isValidated.error) {
            setErrorObj(isValidated);
        } else {
            server.post("/hospital/admin/create", {
                email,
                hospitalAdmin: true
            }).then(response => {
                const result = response.data;
                setMessage(result.message);
                toast.success(result.message);
            }).catch(error => {
                if(error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error.");
                }  
            });
        }
    }

    const particularTypeError = (name) => {
        return name === errorObj.path ? <p className="error">{errorObj.error}</p> : null
    }

    return (
        <AdminCreateCont>
            <div className="heading">
                <h1>Create Admin</h1>
                <p>Input the email for the admin account.</p>
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
                    <SubmitButton
                        onClick={submitHandler}
                        type="submit" >
                        Submit
                    </SubmitButton>
                </div>
            </AuthForm>
        </AdminCreateCont>
    );
}

export default CreateFormAdmin;