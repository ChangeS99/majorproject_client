

//import styles
import {
    FloorListCont
} from '../../../style/dashboard/about-list__styles';

import FloorItem from './FloorItem';

const FloorList = ({ floors, floorClick, selected, setRmList }) => {


    return <FloorListCont>
        {
            floors.length >= 1 ?
                <>
                    {
                        floors.map(floor => <FloorItem 
                            setRmList={setRmList}
                            selected={selected} data={floor} key={floor._id} floorClick={floorClick}/>)
                    }
                </>
                :
                <div>no floor added yet.</div>
        }
    </FloorListCont>
}

export default FloorList;