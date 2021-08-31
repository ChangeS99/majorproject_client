
import { connect } from 'react-redux';


import PatientDetailUpdate from './Detail/PatientDetail';
import EmployeeDetailUpdate from './Detail/EmployeeDetail';

//style
import {
    DetailUpdateCont
} from '../../../../../style/backdrop/update_component_styles';

const DetailUpdate = ({ backdrop, tab }) => {

    const ConditionalRendering = () => {
        switch (backdrop.info.for) {
            case "patient": return <PatientDetailUpdate tab={tab} />;
            case "employee": return <EmployeeDetailUpdate tab={tab} />;
            default: return;
        }
    }

    return (
        <DetailUpdateCont>
            Detail Update
            {
                ConditionalRendering()
            }
        </DetailUpdateCont>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    backdrop: state.backdrop
})

export default connect(mapStateToProps)(DetailUpdate);