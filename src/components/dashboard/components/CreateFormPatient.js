

import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';

import Calendar from 'react-calendar';


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
    const [dischargeDate, setDischargeDate] = useState(new Date());
    const [showdis, setShowdis] = useState(false);

    const [name, setName] = useState({
        firstName: "",
        middleName: "",
        lastName: ""
    })

    const [detail, setDetail] = useState({
        department: departments[0] ? departments[0].name : "no department created",
        email: "",
        diagnosis: ""
    })

    const [admitted, setAdmitted] = useState({
        hour: 0,
        minute: 0,
    });

    const [discharged, setDischarged] = useState({
        hour: 0,
        minute: 0,
    });


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
            case "email": setDetail({
                ...detail,
                email: value
            }); break;
            case "diagnosis": setDetail({
                ...detail,
                diagnosis: value
            }); break;
            default: return;
        }
    }

    const admittedOnChange = (e, type) => {
        const value = e.target.value;

        const hourCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 23) {
                setAdmitted({
                    ...admitted,
                    hour: val
                })
            } else return;
        }

        const minuteCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 59) {
                setAdmitted({
                    ...admitted,
                    minute: val
                })
            } else return;
        }

        switch (type) {
            case "hour": hourCheck(value); break;
            case "minute": minuteCheck(value); break;
            default: return;
        }
    }

    const dischargeOnChange = (e, type) => {
        const value = e.target.value;

        const hourCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 23) {
                setDischarged({
                    ...discharged,
                    hour: val
                })
            } else return;
        }

        const minuteCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 59) {
                setDischarged({
                    ...discharged,
                    minute: val
                })
            } else return;
        }

        switch (type) {
            case "hour": hourCheck(value); break;
            case "minute": minuteCheck(value); break;
            default: return;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let dischargeConfig
        if (showdis === false) {
            dischargeConfig = {}
        } else {
            dischargeConfig = {
                day: dischargeDate.getDate(),
                month: dischargeDate.getMonth(),
                year: dischargeDate.getFullYear(),
                hour: discharged.hour,
                minute: discharged.minute
            }
        }
        const isValidated = patientCreateValidator({
            firstName: name.firstName,
            middleName: name.middleName,
            lastName: name.lastName,
            department: detail.department,
            diagnosis: detail.diagnosis,
            email: detail.email,
            admitted: {
                day: admitDate.getDate(),
                month: admitDate.getMonth(),
                year: admitDate.getFullYear(),
                hour: admitted.hour,
                minute: admitted.minute
            },
            discharged: dischargeConfig
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
                admitted: {
                    day: admitDate.getDate(),
                    month: admitDate.getMonth(),
                    year: admitDate.getFullYear(),
                    hour: admitted.hour,
                    minute: admitted.minute
                },
                discharged: dischargeConfig
            }
        }).then(response => {
            console.log(response.data);
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
                        {particularTypeError(errorObj, "email")}
                        <label>email: </label>
                        <input
                            onChange={e => detailOnChange(e, "email")}
                            value={detail.email}
                            type="email"></input>
                    </div>
                    <div className="patient-form-detail-item">
                        {particularTypeError(errorObj, "department")}
                        <label>department: </label>
                        <select
                            onChange={e => detailOnChange(e, "department")}
                            name="department" id="department">
                            {
                                departments.map(value => {
                                    return <option key={value._id} value={value.name}>{value.name}</option>
                                })
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
                <div className="patient-date-container">
                    <div className="patient-admission-container">
                        <div className="main-heading">Admission</div>
                        <div className="patient-admission-date-container">
                            <div className="patient-form-date-item">
                                {particularTypeError(errorObj, "day")}
                                <label>day: </label>
                                <input value={admitDate.getDate()} disabled type="number" min="1" max="31"></input>
                            </div>
                            <div className="patient-form-date-item">
                                {particularTypeError(errorObj, "month")}
                                <label>month: </label>
                                <input value={admitDate.getMonth()} disabled type="number" min="1" max="12"></input>
                            </div>
                            <div className="patient-form-date-item">
                                {particularTypeError(errorObj, "year")}
                                <label>year: </label>
                                <input value={admitDate.getFullYear()} disabled type="number" min="1950" max="2300"></input>
                            </div>

                        </div>
                        <div className="patient-admission-calendar-container">
                            <div className="calendar-container">
                                <Calendar
                                    onChange={setAdmitDate}
                                    value={admitDate}
                                />
                            </div>
                        </div>
                        <div className="patient-admission-timing-container">
                            <div className="heading">
                                Timing
                            </div>
                            <div className="patient-admission-admitted-container">
                                <div className="label">admitted</div>
                                <div className="patient-admission-time-container">
                                    <div className="patient-admission-time-item">
                                        {particularTypeError(errorObj, "admitted")}
                                        <label>hour: </label>
                                        <input
                                            onChange={(e) => admittedOnChange(e, "hour")}
                                            value={admitted.hour}
                                            type="number"
                                            min="0"
                                            max="23"></input>
                                    </div>
                                    <div className="patient-admission-time-item">
                                        <label>minute: </label>
                                        <input
                                            onChange={e => admittedOnChange(e, "minute")}
                                            value={admitted.minute}
                                            type="number"
                                            min="0"
                                            max="59"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="patient-condition-container">
                            <p className="condition-label">
                                    is discharged:  <spam className="condition-text">{JSON.stringify(showdis)}</spam>
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
                                    <div className="patient-admission-date-container">
                                        <div className="patient-form-date-item">
                                            {particularTypeError(errorObj, "day")}
                                            <label>day: </label>
                                            <input
                                                value={dischargeDate.getDate()}
                                                disabled
                                                type="number"
                                                min="1"
                                                max="31"></input>
                                        </div>
                                        <div className="patient-form-date-item">
                                            {particularTypeError(errorObj, "month")}
                                            <label>month: </label>
                                            <input
                                                value={dischargeDate.getMonth()}
                                                disabled
                                                type="number"
                                                min="1"
                                                max="12"></input>
                                        </div>
                                        <div className="patient-form-date-item">
                                            {particularTypeError(errorObj, "year")}
                                            <label>year: </label>
                                            <input value={dischargeDate.getFullYear()} disabled type="number" min="1950" max="2300"></input>
                                        </div>
                                    </div>
                                    <div className="patient-admission-calendar-container">
                                        <div className="calendar-container">
                                            <Calendar
                                                onChange={setDischargeDate}
                                                value={dischargeDate}
                                            />
                                        </div>
                                    </div>
                                    <div className="patient-admission-timing-container">
                                        <div className="heading">
                                            Timing
                                        </div>
                                        <div className="patient-admission-admitted-container">
                                            <div className="label">
                                                discharged
                                            </div>
                                            <div className="patient-admission-time-container">
                                                <div className="patient-admission-time-item">
                                                    <label>hour: </label>
                                                    <input
                                                        onChange={(e) => dischargeOnChange(e, "hour")}
                                                        value={discharged.hour}
                                                        type="number" min="0" max="23"></input>
                                                </div>
                                                <div className="patient-admission-time-item">
                                                    {particularTypeError(errorObj, "discharged")}
                                                    <label>minute: </label>
                                                    <input
                                                        onChange={(e) => dischargeOnChange(e, "minute")}
                                                        value={discharged.minute}
                                                        type="number" min="0" max="59"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
                <div className="patient-form-btn-container">
                    <button
                        onClick={e => submitHandler(e)}
                    >Submit</button>
                </div>
            </PatientForm>
        </PatientFormContainer>
    )
}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps, {
    setDetailHospital
})(CreateFormPatient);