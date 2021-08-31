// import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';


const Admitted = ({admitted, setAdmitted}) => {

    return (
        <div>
            Admitted
            <div>
                <DateTimePicker
                    onChange={setAdmitted}
                    value={admitted}
                    disableClock={true}
                />
            </div>
        </div>
    )
}

export default Admitted;