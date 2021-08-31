import {useState} from 'react';


//component
import UpdateTopBar from './UpdateTopBar';
import UpdateContent from './UpdateContent';

import {connect} from 'react-redux';

//styles
import {
    UpdatePatientCont
} from '../../../style/backdrop/update_component_styles';

const UpdatePatient = ({info}) => {

    const [tab, setTab] = useState(Object.keys(info)[0]);

    const tabClickHandler = (type) => {
        setTab(type);
    }

    return (
        <UpdatePatientCont>
            <UpdateTopBar tabClick={tabClickHandler} tab={tab}/>
            <UpdateContent tab={tab}/>
        </UpdatePatientCont>
    )
}

const mapStateToProps = state => {
    return {
        info: state.info
    }
}

export default connect(mapStateToProps)(UpdatePatient);