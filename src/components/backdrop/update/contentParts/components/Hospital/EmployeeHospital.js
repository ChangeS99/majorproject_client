import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';
import Switch from 'react-switch';

//actions
import {
    updateSearchResult
} from '../../../../../../actions/hospital/information';
import {
    setInfo
} from '../../../../../../actions/ui/backdrop';

import server from '../../../../../../axiosConfig';

const EmployeeHospitalUpdate = ({
    info,
    result,
    setInfo,
    updateSearchResult,
    tab
}) => {

    const [joined, setJoined] = useState(new Date());
    const [left, setLeft] = useState(new Date());
    const [timing, setTiming] = useState({
        arrival: '00:00',
        leaving: '00:00'
    });

    const [showLeft, setShowLeft] = useState(false);

    const timeChangeHandler = (type, value) => {
        switch (type) {
            case "arrival": setTiming({ ...timing, arrival: value }); break;
            case "leaving": setTiming({ ...timing, leaving: value }); break;
            default: return;
        }
    }

    useEffect(() => {
        const { hospital: h } = info;
        setJoined(new Date(h.joined));

        if (h.left) {
            setLeft(new Date(h.left));
        }
        if (h.timing) {
            setTiming(h.timing);
        }
    }, [info]);

    const showHandler = () => {
        setShowLeft(!showLeft);
    }


    const updateHandler = () => {
        server.put("/hospital/employee/update", {
            data: {
                timing
            },
            employeeId: info.detail._id,
            tab
        }).then(response => {
            console.log(response.data);
            updateSearchResult(result, response.data.raw);
            setInfo("employee", response.data.employee);
            toast.success(response.data.message);
        }).catch(error => {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Network error")
            }

        })
    }

    return (
        <div>
            <div>
                <div>
                    <div>
                        Joined:
                    </div>
                    <div>
                        <DateTimePicker
                            onChange={setJoined}
                            value={joined}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        Employee Left ? {JSON.stringify(showLeft)}
                        <div>
                            <Switch
                                onChange={showHandler}
                                checked={showLeft}
                            />
                        </div>
                    </div>
                    <div>
                        {
                            showLeft ?
                                <>
                                    <div>
                                        Left
                                    </div>
                                    <div>
                                        <DateTimePicker
                                            minDate={joined}
                                            onChange={setLeft}
                                            value={left}
                                        />
                                    </div>
                                </>
                                :
                                null
                        }

                    </div>
                </div>
                <div>
                    <div>Timing</div>
                    <div>
                        arrival:
                        <div>
                            <TimePicker
                                onChange={(value) => {
                                    timeChangeHandler("arrival", value)
                                }}
                                value={timing.arrival}
                                format="h:m a"
                                disableClock={true}
                            />
                        </div>
                    </div>
                    <div>
                        leaving:
                        <div>
                            <div>
                                <TimePicker
                                    onChange={(value) => {
                                        timeChangeHandler("leaving", value)
                                    }}
                                    value={timing.leaving}
                                    format="h:m a"
                                    disableClock={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={updateHandler}>update</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    departments: state.departments,
    result: state.result
})

export default connect(mapStateToProps, {
    updateSearchResult,
    setInfo
})(EmployeeHospitalUpdate);