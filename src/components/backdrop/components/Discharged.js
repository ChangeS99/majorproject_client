import {useEffect } from 'react';
import Switch from 'react-switch';

import DateTimePicker from 'react-datetime-picker';


const Discharged = ({discharged, setDischarged, admitted, showDis, setShowDis}) => {

    useEffect(() => {
        console.log("in discharged: ", discharged);
        // if(discharged) {
        //     onChange(discharged)
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(discharged);
    })

    const onClickHandler = () => {
        setShowDis(!showDis);
    }

    return (
        <div>
            Discharged
            <div>
                <div>
                    <Switch
                        onChange={onClickHandler}
                        checked={showDis}
                        className="react-switch"
                    />
                </div>
                <div>
                    {
                        showDis ?
                            <DateTimePicker
                                onChange={setDischarged}
                                value={discharged}
                                minDate={admitted}
                                minTime={admitted}
                                disableClock={true}
                            /> :
                            null
                    }

                </div>
            </div>
        </div>
    )
}

export default Discharged;