import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import server from '../../axiosConfig';

//action
import {
    setInfo
} from '../../actions/ui/backdrop';

//component
import DetailSidebar from './DetailSidebar';
import DetailMain from './DetailMain';

//style
import {
    PatientDetailCont
} from '../../style/backdrop/backdrop__styles'

const BackdropDetail = ({ backdrop, onCloseHandler, setInfo}) => {

    const [loading, setLoading] = useState({
        state: true,
        error: null
    })

    useEffect(() => {

        let body = "";
        switch(backdrop.info.for) {
            case "patient": body = {patientId: backdrop.info.data._id}; break;
            case "employee": body = {employeeId: backdrop.info.data._id}; break;
            default: return;
        }

        server.post(`/hospital/${backdrop.info.for}/find`,body).then(response => {
            const data = response.data[backdrop.info.for];
            console.log(data);
            setInfo(backdrop.info.for, data);
            setLoading({
                state: false,
                error: null
            });
        }).catch(error => {

            setLoading({
                state: false,
                error: "Network error."
            })
        })
            ;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [mode, setMode] = useState("info");

    const changeModeHandler = (e, type) => {
        switch (type) {
            case "info": setMode(type); break;
            case "update": setMode(type); break;
            case "delete": setMode(type); break;
            default: setMode(type);
        }
    }

    return (
        <PatientDetailCont backdrop={backdrop.show}>
            <div className="detail-container">
                {
                    loading.state ? <p>Loading...</p> :
                        <>
                            <DetailSidebar changeMode={changeModeHandler} mode={mode} />
                            <DetailMain mode={mode} />
                        </>
                }
                <button
                    className="detail-close-btn"
                    onClick={onCloseHandler}> close</button>
            </div>


        </PatientDetailCont>
    )
}

export default connect(null, {
    setInfo
})(BackdropDetail);