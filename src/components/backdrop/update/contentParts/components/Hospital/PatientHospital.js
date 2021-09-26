import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

//action
import {
    updateSearchResult
} from '../../../../../../actions/hospital/information';
import {
    setInfo
} from '../../../../../../actions/ui/backdrop';

import server from '../../../../../../axiosConfig';

//component related to update
import Department from '../../../../components/Department';

//style
import {
    HospitalUpdateCont
} from '../../../../../../style/backdrop/update_component_styles';

const PatientHospitalUpdate = ({
    info,
    departments,
    result,
    tab,
    setInfo,
    updateSearchResult
}) => {

    // const {hospital} = info;

    const [deps, setDeps] = useState([]);
    const [newDep, setNewDep] = useState("");

    useEffect(() => {
        const { hospital } = info;
        if (hospital.departments.length >= 1) {
            let patientDeps = hospital.departments;
            setDeps(patientDeps);
            if (departments.length >= 1) {
                setNewDep(departments[0].name);
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
            toast.error(`Patient is already under the department "${name}"`);
            return;
        }

        if (!name.length >= 1) {
            toast.error("Please add a department from the hospital dashboard.");
            return;
        }

        const newDeps = [...deps, name];
        setDeps([...newDeps]);
    }

    const updateHandler = () => {
        server.patch("/hospital/patient/update", {
            data: {
                departments: deps
            },
            patientId: info.detail._id,
            tab
        }).then(response => {
            console.log(response.data);
            updateSearchResult(result, response.data.raw);
            setInfo("patient", response.data.patient);
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
        <HospitalUpdateCont>
            HospitalUpdate
            <div className="update-item-cont">
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
        </HospitalUpdateCont>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    departments: state.departments,
    result: state.result
})

export default connect(mapStateToProps, {
    setInfo,
    updateSearchResult
})(PatientHospitalUpdate);