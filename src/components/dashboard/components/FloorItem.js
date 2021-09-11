import { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'

import server from '../../../axiosConfig';

//actions
import {
    setFloor,
    setRoom
} from '../../../actions/hospital/information';

const FloorItem = ({ data, setFloor, setRoom, floorClick, selected, setRmList }) => {
    const [btn, setBtn] = useState({
        state: true,
        text: "delete"
    });
    const onDeleteHandler = () => {
        setBtn({ state: false, text: "deleting" });
        server.delete("/hospital/floor/delete", {
            data: {
                floor: {
                    ...data
                }
            }
        })
            .then(response => {
                setBtn({
                    state: true,
                    text: "deleted"
                });
                toast.success(response.data.message);
                setFloor(response.data.floors);
                setRoom(response.data.rooms);
                if(selected.floor === data.number) {
                    setRmList({
                        list: [],
                        floor: -1
                    })
                }
            })
            .catch(error => {
                setBtn({
                    state: true,
                    text: "delete"
                });
                if (error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error.")
                }
            })
    }

    const onClickHandler = (number) => {
        floorClick(number);
    }

    return <div
        className={`floor-item-container ${selected.floor === data.number ? "active-floor": null}`}
        onClick={() => onClickHandler(data.number)}
    >
        <div className="floor-item-detail-container">
            <div>floor</div>
            <div>number: {data.number}</div>
        </div>
        <div className="floor-item-btn-container">
            <button
                onClick={onDeleteHandler}>{btn.text}</button>
        </div>
    </div>
}

export default connect(null, {
    setFloor,
    setRoom
})(FloorItem);