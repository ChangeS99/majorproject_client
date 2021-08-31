// import {useState} from 'react';

import {connect} from 'react-redux';

//component
import UpdatePatient from './UpdatePatient';
import UpdateEmployee from './UpdateEmployee';


const UpdateOption = ({info, backdrop}) => {

    const ConditionalRendering = () => {
        switch(backdrop.info.for){
            case "patient": return <UpdatePatient info={info} />;
            case "employee": return <UpdateEmployee info={info} />;
            default: return null
        }
    }

    return (
        <>
        {
            ConditionalRendering()
        }
        </>
    )
}

const mapStateToProps = state => {
    return {
        info: state.info,
        backdrop: state.backdrop
    }
}

export default connect(mapStateToProps)(UpdateOption);