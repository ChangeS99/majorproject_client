import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

//component
import Admitted from '../../../components/Admitted';
import Discharged from '../../../components/Discharged';

//action
import {
    updateSearchResult
} from '../../../../../actions/hospital/information';
import {
    setInfo
} from '../../../../../actions/ui/backdrop';

import server from '../../../../../axiosConfig';

//style
import {
    DatesUpdateCont
} from '../../../../../style/backdrop/update_component_styles';

const DateUpdate = ({ info, updateSearchResult, setInfo, tab, result }) => {

    const [admitted, setAdmitted] = useState(new Date(info.dates.admitted));

    const [discharged, setDischarged] = useState(new Date());
    const [showDis, setShowDis] = useState(false);

    useEffect(() => {
        const { dates: d } = info;
        setAdmitted(new Date(d.admitted));
        if (!d.discharged) {
            // console.log(dates);
            setDischarged(new Date());
            // console.log("after update: ", dates);
        }
        // console.log(dates);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info]);

    const updateHandler = () => {
        let disTime = discharged.getTime();
        // console.log(disTime, admitted.getTime())
        if (admitted.getTime() > disTime) {
            toast.error("discharged time should be more than admitted time");
            return;
        }

        server.put("/hospital/patient/update", {
            data: {
                admitted,
                discharged
            },
            patientId: info.detail._id,
            tab
        }).then(response => {
            console.log(response.data);
            updateSearchResult(result, response.data.raw);
            setInfo("patient", response.data.patient);
            toast.success(response.data.message);
        }).catch(error => {
            if(error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Network error")
            }
            
        })
    }

    return (
        <DatesUpdateCont>
            Date Update
            <div >
                <Admitted admitted={admitted} setAdmitted={setAdmitted} />
            </div>
            <div>
                <Discharged
                    admitted={admitted}
                    discharged={discharged}
                    setDischarged={setDischarged}
                    showDis={showDis}
                    setShowDis={setShowDis}
                />
            </div>
            <div>
                <button onClick={updateHandler}>update</button>
            </div>
        </DatesUpdateCont>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    result: state.result
})

export default connect(mapStateToProps, {
    updateSearchResult,
    setInfo
})(DateUpdate);