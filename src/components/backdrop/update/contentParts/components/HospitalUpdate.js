import { connect } from 'react-redux';


import PatientHospitalUpdate from './Hospital/PatientHospital';
import EmployeeHospitalUpdate from './Hospital/EmployeeHospital'
    ;
//style
import {
    HospitalUpdateCont
} from '../../../../../style/backdrop/update_component_styles';

const HospitalUpdate = ({
    backdrop,
    tab
}) => {

    const ConditionalRendering = () => {
        switch (backdrop.info.for) {
            case "patient": return <PatientHospitalUpdate tab={tab}/>;
            case "employee": return <EmployeeHospitalUpdate tab={tab}/>;
            default: return;
        }
    }

    return (
        <HospitalUpdateCont>
            HospitalUpdate
            {
                ConditionalRendering()
            }
        </HospitalUpdateCont>
    )
}

const mapStateToProps = state => ({
    backdrop: state.backdrop
})

export default connect(mapStateToProps)(HospitalUpdate);