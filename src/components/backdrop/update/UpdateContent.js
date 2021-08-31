import {connect} from 'react-redux'

//component
import  NameUpdate from './contentParts/components/NameUpdate';
import HospitalUpdate from './contentParts/components/HospitalUpdate';
import ContactUpdate from './contentParts/components/ContactUpdate';
import DetailUpdate from './contentParts/components/DetailUpdate';
import DateUpdate from './contentParts/components/DateUpdate';
import StageUpdate from './contentParts/components/StageUpdate';

//styled
import {
    PatientUpdateMainCont
} from '../../../style/backdrop/update_component_styles'

const UpdateContent  = ({tab, info}) => {

    // const content = Object.keys(info);

    const ConditionalRendering = () => {
        switch(tab) {
            case "name": return <NameUpdate tab={tab}/>;
            case "hospital": return <HospitalUpdate tab={tab}/>;
            case "contact": return <ContactUpdate tab={tab}/>;
            case "detail": return <DetailUpdate tab={tab}/>;
            case "dates": return <DateUpdate tab={tab}/>;
            case "stages": return <StageUpdate tab={tab} />;
            default: return null;
        }
    }

    return (
        <PatientUpdateMainCont>
            {/* Update Content */}
            {
                ConditionalRendering()
            }
        </PatientUpdateMainCont>
    )
}

const mapStateToProps = state => ({
    info: state.info
})

export default connect(mapStateToProps)(UpdateContent);