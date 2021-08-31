

//import styles
import {
    FloorListCont
} from '../../../style/dashboard/about-list__styles';

import FloorItem from './FloorItem';

const FloorList = ({ floors }) => {


    return <FloorListCont>
        {
            floors.length >= 1 ?
                <div>
                    {
                        floors.map(floor => <FloorItem data={floor} key={floor._id} />)
                    }
                </div>
                :
                <div>no floor added yet.</div>
        }
    </FloorListCont>
}

export default FloorList;