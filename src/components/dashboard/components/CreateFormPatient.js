

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';

import DateTimePicker from 'react-datetime-picker';


import server from '../../../axiosConfig';

import {
    particularTypeError
} from '../../../validators';

import {
    patientCreateValidator
} from '../../../validators/patientValidator';

import {
    setDetailHospital
} from '../../../actions/hospital/information';

//style
import {
    PatientFormContainer, PatientForm
} from '../../../style/form/form__styles';

const CreateFormPatient = ({ hospital, setDetailHospital, departments }) => {
    const history = useHistory();
    const [errorObj, setErrorObj] = useState({});
    const [admitDate, setAdmitDate] = useState(new Date());
    // const [dischargeDate, setDischargeDate] = useState(new Date());
    // const [showdis, setShowdis] = useState(false);

    const [name, setName] = useState({
        firstName: "",
        middleName: "",
        lastName: ""
    })

    const [detail, setDetail] = useState({
        department: departments[0] ? departments[0].name : "no department created",
        diagnosis: ""
    })

    const [contact, setContact] = useState({
        email: "",
        phone: ""
    })


    const nameOnChange = (e, type) => {
        const value = e.target.value;

        switch (type) {
            case "firstName": setName({
                ...name,
                firstName: value
            }); break;
            case "middleName": setName({
                ...name,
                middleName: value
            }); break;
            case "lastName": setName({
                ...name,
                lastName: value
            }); break;
            default: return;
        }
    }

    const detailOnChange = (e, type) => {
        const value = e.target.value;

        switch (type) {
            case "department": setDetail({
                ...detail,
                department: value
            }); break;
            case "diagnosis": setDetail({
                ...detail,
                diagnosis: value
            }); break;
            default: return;
        }
    }

    const contactOnChange = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case "email": setContact({
                ...contact,
                email: value
            }); break;
            case "phone": setContact({
                ...contact,
                phone: value
            }); break;
            default: return;
        }
    }
    

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(detail.department);
       
        const isValidated = patientCreateValidator({
            firstName: name.firstName,
            middleName: name.middleName,
            lastName: name.lastName,
            department: detail.department,
            diagnosis: detail.diagnosis,
            email: contact.email,
            phone: contact.phone,
            admitted: admitDate,
            // discharged: dischargeDate
        })

        if (isValidated.error) {
            console.log(isValidated);
            setErrorObj(isValidated);
            return;
        }

        server.post("/hospital/patient/create", {
            data: {
                firstName: name.firstName,
                middleName: name.middleName,
                lastName: name.lastName,
                department: detail.department,
                diagnosis: detail.diagnosis,
                email: contact.email,
                phone: contact.phone,
                admitted: admitDate,
                // discharged: dischargeDate
            }
        }).then(response => {
            console.log(response.data);
            toast.success("patient created successfully");
            history.push(`/hospital/${hospital.name}/dashboard/patient/find`);
        }).catch(error => {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Network error.");
            }
        })
    }

    return (
        <PatientFormContainer>
            <PatientForm>
                <div className="patient-form-name-container">
                    <div className="patient-form-name-item">
                        {particularTypeError(errorObj, "firstName")}
                        <label>firstname: </label>
                        <input
                            onChange={e => nameOnChange(e, "firstName")}
                            value={name.firstName}
                            type="text"></input>
                    </div>
                    <div className="patient-form-name-item">
                        {particularTypeError(errorObj, "middleName")}
                        <label>middlename: </label>
                        <input
                            onChange={e => nameOnChange(e, "middleName")}
                            value={name.middleName}
                            type="text"></input>
                    </div>
                    <div className="patient-form-name-item">
                        {particularTypeError(errorObj, "lastName")}
                        <label>lastname: </label>
                        <input
                            onChange={e => nameOnChange(e, "lastName")}
                            value={name.lastName}
                            type="text"></input>
                    </div>

                </div>
                <div className="patient-form-detail-container">
                    <div className="patient-form-detail-item">
                        {particularTypeError(errorObj, "department")}
                        <label>department: </label>
                        <select
                            onChange={e => detailOnChange(e, "department")}
                            name="department" id="department">
                            {
                                departments.length >= 1 ? 
                                departments.map(value => {
                                    return <option key={value._id} value={value.name}>{value.name}</option>
                                })
                                :
                                <option value="">no department created</option>
                            }
                        </select>
                    </div>
                    <div className="patient-form-detail-item">
                        {particularTypeError(errorObj, "diagnosis")}
                        <label>diagnosis: </label>
                        <input
                            onChange={e => detailOnChange(e, "diagnosis")}
                            value={detail.diagnosis}
                            type="textarea"></input>
                    </div>
                </div>
                <div className="patient-form-contact-container">
                    <div className="patient-form-detail-item">
                        {particularTypeError(errorObj, "email")}
                        <label>email: </label>
                        <input
                            onChange={e => contactOnChange(e, "email")}
                            value={contact.email}
                            type="email"></input>
                    </div>
                    <div className="patient-form-detail-item">
                        {particularTypeError(errorObj, "phone")}
                        <label>phone: </label>
                        <input
                            onChange={e => contactOnChange(e, "phone")}
                            value={contact.phone}
                            type="number"></input>
                    </div>
                </div>
                <div className="patient-date-container">
                    <div className="patient-admission-container">
                        <div className="main-heading">Admission</div>
                        <div className="patient-admission-calendar-container">
                            <div className="calendar-container">
                                <DateTimePicker
                                    onChange={setAdmitDate}
                                    value={admitDate}
                                />
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                    {/* <div>
                        <div className="patient-condition-container">
                            <p className="condition-label">
                                is discharged:  <p className="condition-text">{JSON.stringify(showdis)}</p>
                            </p>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setShowdis(value => !value)
                            }
                            }>change discharge state</button>
                        </div>
                        {
                            showdis ?
                                <div className="patient-admission-container">
                                    <div className="main-heading">
                                        Discharge
                                    </div>
                                    <div className="patient-admission-calendar-container">
                                        <div className="calendar-container">
                                            <DateTimePicker
                                                onChange={setDischargeDate}
                                                value={dischargeDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div> */}
                </div>
                <div className="patient-form-btn-container">
                    <button
                        onClick={e => submitHandler(e)}
                    >Submit</button>
                </div>
            </PatientForm>
        </PatientFormContainer >
    )
}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps, {
    setDetailHospital
})(CreateFormPatient);