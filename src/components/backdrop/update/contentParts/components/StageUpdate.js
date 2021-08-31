import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import StageList from '../../../components/StageList';
import { toast } from 'react-toastify';

import server from '../../../../../axiosConfig';

import {
    setInfo
} from '../../../../../actions/ui/backdrop';

//style
import {
    StageUpdateCont
} from '../../../../../style/backdrop/update_component_styles';
// import { setRoom } from '../../../../../actions/hospital/information';

const StageUpdate = ({ info, floors, rooms, hospital, setInfo }) => {

    const [stages, setStages] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [floor, setFloor] = useState(0);
    const [room, setRoom] = useState({});
    const [stage, setStage] = useState({
        detail: "",
        diagnosis: "",
    })
    // const [btnState, setBtnState] = useState(false);
    // const [stageData, setStageData] = useState(new Date());

    useEffect(() => {
        const { stages: s } = info;
        setStages([...s]);
    }, [info]);

    useEffect(() => {
        if (floors.length >= 1 && rooms.length >= 1) {
            const newList = rooms.filter(room => room.floor === floor);
            setRoomList([...newList]);
            setRoom(newList[0]);
        }

    }, [floor, floors, rooms])


    const onChangeHandler = (e, type) => {
        const value = e.target.value;

        const setUsingRoomId = () => {
            const rm = roomList.filter(room => room._id === value);

            // console.log(rm);
            // console.log(rm[0]);
            setRoom(rm[0]);
        }

        switch (type) {
            case "floor": setFloor(Number(value)); break;
            case "room": setUsingRoomId(value); break;
            case "detail": setStage({ ...stage, detail: value.trim() }); break;
            case "diagnosis": setStage({ ...stage, diagnosis: value.trim() }); break;
            default: return;
        }

        // console.log(floor, roomList)
    }

    const addHandler = () => {
        if (roomList.length < 1) {
            toast.error("please create a room for the specific floor from about page");
            return;
        }

        if (stage.detail.length < 1) {
            toast.error("Please provide detail for the stage.");
            return;
        }

        const newStage = {
            floor,
            room: {
                number: room.number,
                name: room.name
            },
            detail: stage.detail,
            diagnosis: stage.diagnosis,
            patientId: info.detail._id,
            hospitalId: hospital._id
        }
        server.post("/hospital/patient/stage/create", {
            stage: {
                ...newStage
            }
        }).then(response => {
            console.log(response.data);
            setStages([...stages, response.data.stage]);
            setInfo(response.data.patient);
            toast.success(response.data.message);
        }).catch(error => {
            if(error.response) {
                console.log(error.response.data.error);
            } else {
                console.log(error);
            }
        })
        console.log(stages);
    }

    // const updateHandler = () => {
    //     server.post("/hospital/patient/stage/create", {
    //         patientId: info.detail._id,
    //         stages
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             setInfo("patient", response.data.patient);
    //             toast.success(response.data.message);
    //         })
    //         .catch(error => {
    //             if (error.response) {
    //                 console.log(error.response.data.error);
    //             } else {
    //                 console.log(error);
    //             }
    //         })
    // }

    const ConditionalRendering = () => {
        if (floors.length < 1 || rooms.length < 1) {
            return <div>
                Please create floors and rooms from the about page first.
            </div>
        } else {
            return <>
                <div>
                    <label>floor number: </label>
                    <select
                        onChange={e => onChangeHandler(e, "floor")}
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
                <div>
                    <label>room: </label>
                    <select
                        onChange={e => onChangeHandler(e, "room")}
                        name="room" id="room">
                        {
                            roomList.length >= 1 ?
                                roomList.map(value => {
                                    return <option key={value._id} value={value._id}>room: {value.number}, name: {value.name}</option>
                                })
                                :
                                <option value="">no room created</option>
                        }
                    </select>
                </div>
                <div>
                    <button onClick={addHandler}>add</button>
                </div>
            </>
        }
    }

    const deleteHandler = (_id) => {
        server.delete("/hospital/patient/stage/delete", {
            data: {
                _id,
                patientId: info.detail._id
            }
        })
        .then(response => {
            console.log(response.data);
            toast.success(response.data.message);
            setStages(response.data.stages);
            setInfo(response.data.patient);
        })
        .catch(error => {
            if(error.response) {
                console.log(error.response.data.error)
            } else {
                console.log(error);
            }
        })
    }

    return (
        <StageUpdateCont>
            Stages,
            <div>
                <StageList stages={stages} setStages={setStages} deleteHandler={deleteHandler} />
            </div>
            <div>
                <div>
                    <label>detail: </label>
                    <input
                        onChange={e => onChangeHandler(e, "detail")}
                        type="text" />
                </div>
                <div>
                    <label>diagnosis: </label>
                    <input
                        onChange={e => onChangeHandler(e, "diagnosis")}
                        type="text" />
                </div>
                floor and room numbers:
                {
                    ConditionalRendering()
                }
                <div>

                </div>
            </div>
            <div>
                <button
                    // onClick={updateHandler}
                // disabled={btnState}
                >update</button>
            </div>
        </StageUpdateCont>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    floors: state.floors,
    rooms: state.rooms,
    hospital: state.hospital
})
export default connect(mapStateToProps, {
    setInfo
})(StageUpdate);