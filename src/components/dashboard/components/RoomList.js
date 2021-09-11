
//import styles
import {
    RoomListCont
} from '../../../style/dashboard/about-list__styles';

import RoomItem from './RoomItem';

const RoomList = ({ rooms, setRmList }) => {
    console.log(rooms);
    return <RoomListCont>
        {
            rooms.list.length >= 1 ?
                <>
                    {
                        rooms.list.map(room => <RoomItem data={room} key={room._id} setRmList={setRmList} />)
                    }
                </>
                :
                <div>{
                    rooms.floor === -1 ?
                        <div>No floor added yet.</div>
                        :
                        <div>No room added for floor {rooms.floor}</div>
                }</div>
        }
    </RoomListCont>
}

export default RoomList;