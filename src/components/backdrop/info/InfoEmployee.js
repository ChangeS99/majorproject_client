import DateTimePicker from 'react-datetime-picker';

// Accepts a Date object or date string that is recognized by the Date.parse() method
function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

const InfoPatient = ({ info }) => {
    const {
        name,
        detail,
        hospital
    } = info;

    const joinedDate = new Date(hospital.joined);

    return <div>
        InfoMode
        <div>
            name:
            <div>
                firstname: {name.firstName}
                middlename: {name.middleName}
                lastname: {name.lastName}
            </div>
        </div>
        <div>
            department:
            <div>
                {detail.department}
            </div>
        </div>
        <div>
            role:
            <div>
                {detail.role}
            </div>
        </div>
        <div>
            joined at:
            <div>
                {`${getDayOfWeek(joinedDate)} `}
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
    </div>
}

export default InfoPatient;