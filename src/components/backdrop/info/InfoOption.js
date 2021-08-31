import { connect } from 'react-redux';
// import DateTimePicker from 'react-datetime-picker';

// // Accepts a Date object or date string that is recognized by the Date.parse() method
// function getDayOfWeek(date) {
//     const dayOfWeek = new Date(date).getDay();
//     return isNaN(dayOfWeek) ? null :
//         ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
// }

import InfoPatient from './InfoPatient';
import InfoEmployee from './InfoEmployee';

const InfoOption = ({ info, backdrop }) => {

    const ConditionalRendering = () => {
        switch(backdrop.info.for){
            case "patient": return <InfoPatient info={info} />;
            case "employee": return <InfoEmployee info={info} />;
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

const mapStateToProps = state => ({
    info: state.info,
    backdrop: state.backdrop
})

export default connect(mapStateToProps)(InfoOption);