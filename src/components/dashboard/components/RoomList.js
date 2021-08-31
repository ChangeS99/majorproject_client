
//import styles
import {
    RoomListCont
} from '../../../style/dashboard/about-list__styles';

import RoomItem from './RoomItem';

const RoomList = ({ rooms}) => {
    return <RoomListCont>
        {
            rooms.length >= 1 ?
                <div>
                    {
                        rooms.map(room => <RoomItem data={room} key={room._id} />)
                    }
                </div>
                :
                <div>no room added yet.</div>
        }
    </RoomListCont>
}

export default RoomList;