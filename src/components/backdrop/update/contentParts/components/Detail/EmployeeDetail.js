import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Department from '../../../../components/Department';
import Role from '../../../../components/Role';


//action
import {
    updateSearchResult
} from '../../../../../../actions/hospital/information';
import {
    setInfo
} from '../../../../../../actions/ui/backdrop'


import server from '../../../../../../axiosConfig';


//style
// import {
//     DetailUpdateCont
// } from '../../../../../style/backdrop/update_component_styles';

const EmployeeDetailUpdate = ({ info, departments, reduxRoles,  tab, result }) => {

    const [deps, setDeps] = useState([]);
    const [roles, setRoles] = useState([]);
    const [newDep, setNewDep] = useState("");
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        const { detail } = info;
        if (detail.departments.length >= 1) {
            let patientDeps = detail.departments;
            setDeps(patientDeps);
            if (departments.length >= 1) {
                setNewDep(departments[0].name);
            }
        }

        if (detail.roles.length >= 1) {
            let patientRoles = detail.roles;
            setRoles(patientRoles);
            if (reduxRoles.length >= 1) {
                setNewRole(reduxRoles[0].name);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const depRemoveHandler = (name) => {
        const newDeps = deps.filter(item => item !== name);
        setDeps([...newDeps]);
    }

    const depAddHandler = (name) => {
        const depExist = deps.find(item => item === name);
        if (depExist) {
            toast.error(`Employee is already under the department "${name}"`);
            return;
        }

        if (!name.length >= 1) {
            toast.error("Please add a department from the hospital dashboard.");
            return;
        }

        const newDeps = [...deps, name];
        setDeps([...newDeps]);
    }


    const roleRemoveHandler = (name) => {
        const newRoles = roles.filter(item => item !== name);
        setRoles([...newRoles]);
    }

    const roleAddHandler = (name) => {
        const roleExist = roles.find(item => item === name);
        if (roleExist) {
            toast.error(`Employee is already has the role"${name}"`);
            return;
        }

        if (!name.length >= 1) {
            toast.error("Please add a role from the hospital dashboard.");
            return;
        }

        const newRoles = [...roles, name];
        setRoles([...newRoles]);
    }

    const updateHandler = () => {

        server.put("/hospital/employee/update", {
            data: {
                roles,
                departments: deps
            },
            employeeId: info.detail._id,
            tab
        }).then(response => {
            console.log(response.data);
            updateSearchResult(result, response.data.raw);
            setInfo("employee", response.data.employee);
            toast.success(response.data.message);
        }).catch(error => {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Network error")
            }

        })
    }

    return (
        <>
            <div className="update-item-cont">
                <label>role: </label>
                <Role
                    userRoles={roles}
                    newRole={newRole}
                    roleRemoveHandler={roleRemoveHandler}
                    roleAddHandler={roleAddHandler}
                />
            </div>
            <div className="update-item-cont">
                <label>department: </label>
                <Department
                    userDeps={deps}
                    newDep={newDep}
                    depRemoveHandler={depRemoveHandler}
                    depAddHandler={depAddHandler}
                />
            </div>

            <div>
                <button
                    onClick={updateHandler}
                >update</button>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    result: state.result,
    departments: state.departments,
    reduxRoles: state.roles
})

export default connect(mapStateToProps, {
    setInfo,
    updateSearchResult,
})(EmployeeDetailUpdate);