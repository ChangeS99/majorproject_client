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
    employeeCreateValidator
} from '../../../validators/employeeValidator';

import {
    setDetailHospital
} from '../../../actions/hospital/information';

import {
    EmployeeFormContainer,
    EmployeeForm
} from '../../../style/form/form__styles';

const CreateFormEmployee = ({ hospital, setDetailHospital, departments, roles }) => {
    const history = useHistory();
    const [errorObj, setErrorObj] = useState({});
    const [date, setDate] = useState(new Date());

    const [name, setName] = useState({
        firstName: "",
        middleName: "",
        lastName: ""
    })

    const [detail, setDetail] = useState({
        role: roles[0] ? roles[0].name : "",
        department: departments[0] ? departments[0].name : "",
        email: ""
    })

    const [arrival, setArrival] = useState({
        hour: 0,
        minute: 0,
    });

    const [leaving, setLeaving] = useState({
        hour: 0,
        minute: 0,
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
            case "role": setDetail({
                ...detail,
                role: value
            }); break;
            case "department": setDetail({
                ...detail,
                department: value
            }); break;
            case "email": setDetail({
                ...detail,
                email: value
            }); break;
            default: return;
        }
    }

    const arrivalOnChange = (e, type) => {
        const value = e.target.value;

        const hourCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 23) {
                setArrival({
                    ...arrival,
                    hour: val
                })
            } else return;
        }

        const minuteCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 59) {
                setArrival({
                    ...arrival,
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

    const leavingOnChange = (e, type) => {
        const value = e.target.value;

        const hourCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 23) {
                setLeaving({
                    ...leaving,
                    hour: val
                })
            } else return;
        }

        const minuteCheck = (val) => {
            if (String(val).length > 2) {
                return;
            }

            if (val <= 59) {
                setLeaving({
                    ...leaving,
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
        const isValidated = employeeCreateValidator({
            firstName: name.firstName,
            middleName: name.middleName,
            lastName: name.lastName,
            email: detail.email,
            role: detail.role,
            department: detail.department,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            arrival,
            leaving
        })

        if (isValidated.error) {
            console.log(isValidated)
            setErrorObj(isValidated)
        } else {
            server.post("/hospital/employee/create", {
                data: {
                    firstName: name.firstName,
                    middleName: name.middleName,
                    lastName: name.lastName,
                    email: detail.email,
                    role: detail.role,
                    department: detail.department,
                    joined: {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear()
                    },
                    timing: {
                        arrival,
                        leaving
                    }
                }
            })
                .then(response => {
                    setDetailHospital()
                        .then(_ => {
                            history.push(`/hospital/${hospital.name}/dashboard/employee`)
                        })
                        .catch(error => {
                            console.log(error);
                            if (error.response) {
                                toast.error(error.response.data.error);
                                console.log(error.response.data)
                            } else {
                                toast.error("Network error.")
                            }
                        })
                })
                .catch(error => {
                    console.log(error);
                    if (error.response) {
                        toast.error(error.response.data.error);
                        console.log(error.response.data)
                    } else {
                        toast.error("Network error.")
                    }
                })
        }
    }

    return (
        <EmployeeFormContainer>
            <EmployeeForm>
                <div className="employee-form-name-container">
                    <div className="employee-form-name-item">
                        {particularTypeError(errorObj, "firstName")}
                        <label>firstname: </label>
                        <input
                            onChange={e => nameOnChange(e, "firstName")}
                            value={name.firstName}
                            type="text"></input>
                    </div>
                    <div className="employee-form-name-item">
                        {particularTypeError(errorObj, "middleName")}
                        <label>middlename: </label>
                        <input
                            onChange={e => nameOnChange(e, "middleName")}
                            value={name.middleName}
                            type="text"></input>
                    </div>
                    <div className="employee-form-name-item">
                        {particularTypeError(errorObj, "lastName")}
                        <label>lastname: </label>
                        <input
                            onChange={e => nameOnChange(e, "lastName")}
                            value={name.lastName}
                            type="text"></input>
                    </div>
                </div>
                <div className="employee-form-detail-container">
                    <div className="employee-form-detail-item">
                        {particularTypeError(errorObj, "email")}
                        <label>email: </label>
                        <input
                            onChange={e => detailOnChange(e, "email")}
                            value={detail.email}
                            type="email"></input>
                    </div>
                    <div className="employee-form-detail-item">
                        {particularTypeError(errorObj, "role")}
                        <label>role: </label>
                        <select
                            onChange={e => detailOnChange(e, "role")}
                            name="field" id="field">
                            {
                                roles.map(value => {
                                    return <option key={value._id} value={value.name}>{value.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="employee-form-detail-item">
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
                </div>
                <div className="timing-join-container">
                    <div className="timing-join-date-container">
                        Joined at:
                        <div className="timing-join-day-container">
                            <div className="timing-join-date-item">
                                {particularTypeError(errorObj, "day")}
                                <label>day: </label>
                                <input
                                    value={date.getDate()}
                                    disabled
                                    type="number"
                                    min="1"
                                    max="31"></input>
                            </div>
                            <div className="timing-join-date-item">
                                {particularTypeError(errorObj, "month")}
                                <label>month: </label>
                                <input
                                    value={date.getMonth()}
                                    disabled
                                    type="number"
                                    min="1"
                                    max="12"></input>
                            </div>
                            <div className="timing-join-date-item">
                                {particularTypeError(errorObj, "year")}
                                <label>year: </label>
                                <input
                                    value={date.getFullYear()}
                                    disabled
                                    type="number"
                                    min="1950"
                                    max="2300"></input>
                            </div>
                        </div>
                        <div className="timing-join-calendar-container">
                            <div className="calendar-container">
                                <Calendar
                                    onChange={setDate}
                                    value={date}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="timing-time-container">
                        Timing:
                        <div>
                            arrival
                        </div>
                        <div className="timing-time-arrival-container">
                            <div className="timing-time-arrival-item">
                                {particularTypeError(errorObj, "arrival")}
                                <div>
                                    <label>hour: </label>
                                    <input
                                        onChange={(e) => arrivalOnChange(e, "hour")}
                                        value={arrival.hour}
                                        type="number"
                                        min="0"
                                        max="23"></input>
                                </div>
                                <div>
                                    <label>minute: </label>

                                    <input
                                        onChange={e => arrivalOnChange(e, "minute")}
                                        value={arrival.minute}
                                        type="number"
                                        min="0"
                                        max="59"></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            leaving
                        </div>
                        <div className="timing-time-leaving-container">
                            <div className="timing-time-leaving-item">
                                {particularTypeError(errorObj, "leaving")}
                                <div>
                                    <label>hour: </label>
                                    <input
                                        onChange={(e) => leavingOnChange(e, "hour")}
                                        value={leaving.hour}
                                        type="number" min="0" max="23"></input>
                                </div>
                                <div>
                                    <label>minute: </label>
                                    <input
                                        onChange={(e) => leavingOnChange(e, "minute")}
                                        value={leaving.minute}
                                        type="number" min="0" max="59"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="employee-form-btn-container">
                    <button
                        onClick={e => submitHandler(e)}
                    >Submit</button>
                </div>
            </EmployeeForm>
        </EmployeeFormContainer>
    )
}

const mapStateToProps = state => ({
    departments: state.departments,
    roles: state.roles
})

export default connect(mapStateToProps, {
    setDetailHospital
})(CreateFormEmployee);