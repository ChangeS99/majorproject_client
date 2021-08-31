
import {connect} from 'react-redux';

import UpdateOption from './update/UpdateOption';


const UpdateMode = ({backdrop}) => {

    // const {info} = backdrop;

    const ConditionalRendering = () => {
        return <UpdateOption />
    }

    return (
        <>
            {
                ConditionalRendering()
            }
        </>
    )
}

const mapStateToProps = state => ({
    backdrop: state.backdrop
})

export default connect(mapStateToProps)(UpdateMode);