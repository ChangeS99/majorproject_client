import { connect } from 'react-redux';

import InfoOption from './info/InfoOption';

const InfoMode = ({ backdrop, patient }) => {

    // const { info } = backdrop

    const ConditionalRendering = () => {
        return <InfoOption />
        // switch (info.for) {
        //     case "patient": return <InfoPatient/>;
        //     case "employee": return <InfoOption />
        //     default: return <div>none</div>;
        // }
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

export default connect(mapStateToProps)(InfoMode);