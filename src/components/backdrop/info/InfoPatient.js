import DateTimePicker from 'react-datetime-picker';

// Accepts a Date object or date string that is recognized by the Date.parse() method
function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

const InfoPatient = ({info}) => {
    const {
        name,
        dates,
        hospital
    } = info;

    const admitDate = new Date(dates.admitted);

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
                {
                    hospital.departments.map(item => {
                        return <p key={`${item}${Date.now()}`}>
                            {item}
                        </p>
                    })
                }

            </div>
        </div>
        <div>
            admitted at:
            <div>
                {`${getDayOfWeek(admitDate)} `}
                <DateTimePicker
                    format={"dd-MM-y h:mm a"}
                    clearIcon={null}
                    required={false}
                    disabled={true}
                    disableClock={true}
                    disableCalendar={true}
                    value={admitDate}
                />
            </div>
        </div>
    </div>
}

export default InfoPatient;