import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'rc-scrollbars';

import { DashContentContainer } from '../../style/dashboard/content__styles';

import {toast} from 'react-toastify';


import List from './components/List';

import {
    setRoles,
    setDeps,
    removeRole,
    removeDep,
    setDetailHospital
} from '../../actions/hospital/information';

import server from '../../axiosConfig';

const About = ({ hospital, dashmode, roles, departments, setDetailHospital, setDeps, setRoles, removeRole, removeDep }) => {

    const [btnState, setBtnState] = useState(false);

    const [rnd, setRnd] = useState({
        role: "",
        department: ""
    });

    useEffect(() => {
        setDetailHospital()
            .then(result => {
                // console.log(result);
                // setLoading(false);
            })
            .catch(_ => {

            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        server.get("/hospital/role/all")
            .then(roleRes => {

                server.get("/hospital/department/all")
                    .then(depRes => {
                        setRoles(roleRes.data.roles);
                        setDeps(depRes.data.departments);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error);
            })

        // return () => {
        //     removeRole(null, []);
        //     removeDep(null, []);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case "role": setRnd({ ...rnd, role: value.trim() }); break;
            case "department": setRnd({ ...rnd, department: value.trim() }); break;
            default: return;
        }
    }

    const addHandler = (type) => {

        if (!rnd.role.length >= 1 && !rnd.department.length >= 1) {
            return;
        }
        console.log(type);
        if (type === "role") {
            setBtnState(true);
            server.post(`/hospital/${type}/create`, {
                name: rnd.role
            }).then(response => {
                setBtnState(false)
                console.log(response.data);
                toast.success(response.data.message);
                setRoles(response.data.roles);
            }).catch(error => {
                setBtnState(false)
                if(error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error.")
                }
                console.log(error);
            })
        }

        if (type === "department") {
            setBtnState(true)
            server.post(`/hospital/${type}/create`, {
                name: rnd.department
            }).then(response => {
                setBtnState(false)
                console.log(response.data);
                toast.success(response.data.message);
                setDeps(response.data.departments);
            }).catch(error => {
                setBtnState(false);
                if(error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error.")
                }
                console.log(error);
            })
        }
    }

    return (
        <DashContentContainer>
            <div className="about-detail-container">
                <div className="about-detail-header">
                    <h1>{hospital.name}</h1>
                </div>
                <div className="about-detail-main">
                    <div className="about-detail-main-item">
                        <p>employees: {hospital.employees}</p>
                    </div>
                    {/* <div className="about-detail-main-item">
                        <p>staffs: {hospital.staffs}</p>
                    </div> */}
                    <div className="about-detail-main-item">
                        <p>patients: {hospital.patients}</p>
                    </div>
                    <div className="about-detail-main-item">
                        <p>admins: {hospital.admins}</p>
                    </div>
                </div>
            </div>
            <div className="role-department-container">
                <div className="role-container">
                    <h1>Roles: </h1>
                    <div className="role-content">
                        {roles.length >= 1 ?
                            <div className="role-content-list">
                                <Scrollbars autoHide style={{ width: "15rem", height: "17rem" }}>
                                    <List forRole dashmode={dashmode} data={roles} />
                                </Scrollbars>
                            </div>
                            :
                            <p>no roles, add one.</p>}
                    </div>
                    <div className="role-input-cont">
                        <input
                            value={rnd.role}
                            onChange={e => onChangeHandler(e, "role")}></input>
                        <button
                            disabled={btnState}
                            onClick={() => addHandler("role")}
                        ><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <div className="department-container">
                    <h1>Departments: </h1>
                    <div className="department-content">
                        {departments.length >= 1 ?
                            <Scrollbars autoHide style={{ width: "15rem", height: "18rem" }}>
                                <List forDep dashmode={dashmode} data={departments} />
                            </Scrollbars>

                            :
                            <p>no department, add one.</p>}
                    </div>
                    <div className="department-input-cont">
                        <input
                            value={rnd.department}
                            onChange={e => onChangeHandler(e, "department")}></input>
                        <button
                            disabled={btnState}
                            onClick={() => addHandler("department")}
                        ><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        </DashContentContainer>
    )
}

const mapStateToProps = state => ({
    hospital: state.hospital,
    roles: state.roles,
    departments: state.departments
})

export default connect(mapStateToProps, {
    setDeps,
    setRoles,
    removeRole,
    removeDep,
    setDetailHospital
})(About);

