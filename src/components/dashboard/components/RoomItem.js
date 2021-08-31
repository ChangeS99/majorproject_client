import {useState} from 'react';
import { connect } from 'react-redux';
import {toast} from 'react-toastify'

import server from '../../../axiosConfig';

//actions
import {
    setRoom
} from '../../../actions/hospital/information';

const RoomItem = ({ data, setRoom }) => {

    const [btn, setBtn] = useState({
        state: true,
        text: "delete"
    });
    const onDeleteHandler = () => {
        setBtn({state: false, text: "deleting"});
        server.delete("/hospital/room/delete", {
            data: {
                room: {
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
            setRoom(response.data.rooms);
        })
        .catch(error => {
            setBtn({
                state: true,
                text: "delete"
            });
            if(error.response){
                toast.error(error.response.data.error);
            } else {
                toast.error("Network error.")
            }
        })
    }   

    return <div>
        <div>
            <div>room name: {data.name}</div>
            <div>number: {data.number}, floor number: {data.floor}</div>
        </div>
        <div>
            <button
            disabled={!btn}
            onClick={onDeleteHandler}
            >{btn.text}</button>
        </div>
    </div>
}

export default connect(null, {
    setRoom
})(RoomItem);