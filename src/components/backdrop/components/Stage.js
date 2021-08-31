import { connect } from 'react-redux';

import StageList from './StageList';

//component

const Stage = ({ info, floors, rooms }) => {

    const { hospital } = info;

    return (
        <div>
            Stages,
            <div>
                <StageList stages={hospital.stages} />
            </div>
            <div>
                <div>
                    <label>detail: </label>
                    <input type="text" />
                </div>
                <div>
                    <label>diagnosis: </label>
                    <input type="text" />
                </div>
                floor and room numbers:
                <div>
                    <label>floor number: </label>
                    <select
                        // onChange={e => onChangeFloorRoom(e, "room_floor")}
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
                    <select>
                        <option></option>
                    </select>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    floors: state.floors,
    rooms: state.rooms
})

export default connect(mapStateToProps)(Stage);