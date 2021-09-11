import DateTimePicker from 'react-datetime-picker';

//styles
import {
    InfoCont
} from '../../../style/backdrop/info_component_styles';

// Accepts a Date object or date string that is recognized by the Date.parse() method
function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

const InfoEmployee = ({ info }) => {
    const {
        name,
        detail,
        hospital
    } = info;

    const joinedDate = new Date(hospital.joined);

    return <InfoCont>
        <div className="info-name-cont">
            <div className="info-name-header">name:</div>
            <div className="info-name-item-cont">
                <div className="info-name-item">firstname: {name.firstName}</div>
                <div className="info-name-item">middlename: {name.middleName}</div>
                <div className="info-name-item">lastname: {name.lastName}</div>
            </div>
        </div>
        {/* <div>
            department:
            <div>
                {detail.department}
            </div>
        </div> */}
        <div className="info-department-cont">
            <div className="info-department-header">departments:</div>
            <div className="info-department-item-cont">
                {
                    detail.departments.map(item => {
                        return <p className="info-department-item" key={`${item}${Date.now()}`}>
                            {item},
                        </p>
                    })
                }

            </div>
        </div>
        <div className="info-department-cont">
            <div className="info-department-header">roles:</div>
            <div className="info-department-item-cont">
                {
                    detail.roles.map(item => {
                        return <p className="info-department-item" key={`${item}${Date.now()}`}>
                            {item},
                        </p>
                    })
                }

            </div>
        </div>
        <div className="info-date-cont">
            <div className="info-date-header">joined at:</div>
            <div className="info-date-item-cont">
                {`${getDayOfWeek(joinedDate)}, `}
                <DateTimePicker
                    format={"dd-MM-y h:mm a"}
                    clearIcon={null}
                    required={false}
                    disabled={true}
                    disableClock={true}
                    disableCalendar={true}
                    value={joinedDate}
                />
            </div>
        </div>
    </InfoCont>
}

export default InfoEmployee;