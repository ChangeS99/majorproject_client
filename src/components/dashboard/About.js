import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'rc-scrollbars';

import { DashContentContainer } from '../../style/dashboard/content__styles';

import { toast } from 'react-toastify';


import List from './components/List';

import FloorList from './components/FloorList';
import RoomList from './components/RoomList';

import {
    setRoles,
    setDeps,
    removeRole,
    removeDep,
    setFloor,
    setRoom,
    setDetailHospital
} from '../../actions/hospital/information';

import server from '../../axiosConfig';

const About = ({
    hospital,
    dashmode,
    roles,
    departments,
    setDetailHospital,
    setDeps,
    setRoles,
    rooms,
    floors,
    setFloor,
    setRoom
}) => {

    const [btnState, setBtnState] = useState(false);
    const [flrRm, setFlrRmState] = useState(false);

    const [rnd, setRnd] = useState({
        role: "",
        department: ""
    });

    const [flr, setFlr] = useState({ number: 0 });
    const [rm, setRm] = useState({
        number: 0,
        name: "",
        floor: 0
    })

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        server.get("/hospital/floor/all")
            .then(floorRes => {
                server.get("/hospital/room/all")
                    .then(roomRes => {
                        console.log(floorRes);
                        console.log(roomRes);
                        setFloor(floorRes.data.floors);
                        setRoom(roomRes.data.rooms);
                    })
                    .catch(error => {
                        console.log(error)
                        // if (error.response) {
                        //     toast.error(error.response.data.error);
                        // } else {
                        //     toast.error("Network error")
                        // }

                    })
            })
            .catch(error => {
                console.log(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        const makeRequest = (type) => {
            setBtnState(true);
            server.post(`/hospital/${type}/create`, {
                name: rnd[type]
            }).then(response => {
                setBtnState(false)
                console.log(response.data);
                toast.success(response.data.message);

                if (type === "role") {
                    setRoles(response.data.roles);
                } else {
                    setDeps(response.data.departments);
                }

            }).catch(error => {
                setBtnState(false)
                if (error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error.")
                }
                console.log(error);
            })
        }

        if (type === "role") {
            makeRequest(type);
        }

        if (type === "department") {
            makeRequest(type);
        }
    }

    const onChangeFloorRoom = (e, type) => {
        const value = e.target.value;
        if (type === "room" || type === "floor" || type === "room_floor") {

            if(typeof Number(value) !== "number"){
                return
            }

            if(Number(value) % 1 !== 0) {
                return
            }

            if (Number(value) < 0 || Number(value > 10000)) {
                return;
            }
        }

        switch (type) {
            case "floor": setFlr({ number: value }); break;
            case "room": setRm({ ...rm, number: value }); break;
            case "room_name": setRm({ ...rm, name: value }); break;
            case "room_floor": setRm({ ...rm, floor: value }); break;
            default: return;
        }

    }

    const addHandlerFloorRoom = (type) => {
        if (flr.number < 0 && rm.number < 0) {
            return;
        }

        if (type === "room") {
            if (floors.length < 1) {
                toast.error("Please create a floor first before creating a room.")
                return;
            }
        }

        if (type === "room" && rm.name.length < 1) {
            toast.error("please enter a valid name.")
            return;
        }
        const makeRequest = (type) => {
            setFlrRmState(true);

            const body = type === "floor" ? { floor: { ...flr } } : { room: { ...rm } };

            server.post(`/hospital/${type}/create`, body).then(response => {
                setFlrRmState(false)
                console.log(response.data);
                toast.success(response.data.message);

                if (type === "floor") {
                    setFloor(response.data.floors)
                } else {
                    setRoom(response.data.rooms);
                }
            }).catch(error => {
                setFlrRmState(false)
                if (error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error.")
                }
                console.log(error);
            })
        }

        makeRequest(type);
    }

    return (
        <DashContentContainer>
            <div className="about-container">
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
                            ><i className="fas fa-plus"></i></button>
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
                            ><i className="fas fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="floor-room-management">
                <div className="header"><h3>Floor and room management</h3></div>
                <div className="floor-room-main-cont">
                    <div className="floor-item">
                        <div className="floor-item-content">
                            <FloorList floors={floors} />
                            <div className="item-input-cont">
                                <div className="item-input-item">
                                    <label>floor number: </label>
                                    <input
                                        step={1}
                                        onChange={e => onChangeFloorRoom(e, "floor")}
                                        value={flr.number}
                                        type="number"
                                        min={0}
                                    />
                                </div>
                                <div className="item-input-btn-item">
                                    <button
                                        disabled={flrRm}
                                        onClick={e => addHandlerFloorRoom("floor")}
                                    >add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="room-item">
                        <div className="room-item-content">
                            <RoomList rooms={rooms} />
                            <div className="item-input-cont">
                                <div className="room-input-cont">
                                    <div className="item-input-item">
                                        <label>room number: </label>
                                        <input
                                            step={1}
                                            onChange={e => onChangeFloorRoom(e, "room")}
                                            value={rm.number}
                                            type="number"
                                            min={0}
                                        />
                                    </div>
                                    <div className="item-input-item">
                                        <label>room name: </label>
                                        <input
                                            onChange={e => onChangeFloorRoom(e, "room_name")}
                                            value={rm.name}
                                            type="text"
                                        />
                                    </div>
                                    <div className="item-input-item">
                                        <label>floor number: </label>
                                        <select
                                            onChange={e => onChangeFloorRoom(e, "room_floor")}
                                            name="room_floor" id="room_floor">
                                            {
                                                floors.length >= 1 ?
                                                    floors.map(value => {
                                                        return <option key={value._id} value={value.number}>{value.number}</option>
                                                    })
                                                    :
                                                    <option value="">no floor created</option>
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="item-input-btn-item">
                                    <button
                                        disabled={flrRm}
                                        onClick={e => addHandlerFloorRoom("room")}
                                    >add</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DashContentContainer>
    )
}

const mapStateToProps = state => ({
    hospital: state.hospital,
    roles: state.roles,
    departments: state.departments,
    floors: state.floors,
    rooms: state.rooms
})

export default connect(mapStateToProps, {
    setDeps,
    setRoles,
    removeRole,
    removeDep,
    setFloor,
    setRoom,
    setDetailHospital
})(About);

