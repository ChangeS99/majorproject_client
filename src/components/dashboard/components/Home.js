import { useEffect } from 'react';
import { connect } from 'react-redux';

import server from '../../../axiosConfig';

import {
    setAnnouncement,
    emptyAnnouncement
} from '../../../actions/hospital/information';

const Home = ({ dashmode, setAnnouncement, emptyAnnouncement, announcements }) => {

    useEffect(() => {

        server.post("/hospital/admin/announcement/find", {
            field: dashmode
        }).then(response => {
            console.log(response.data);
            setAnnouncement(response.data.announcements);
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data)
            } else {
                console.log("network error.")
            }
        })

        return () => {
            emptyAnnouncement([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const PatientHome = () => {
        return <div>
            <div>
                <p>
                    An apple a day keeps the doctor away.
                </p>
            </div>
            <div>
                <h2>Announcements: </h2>
                <div>{JSON.stringify(announcements)}</div>
            </div>
        </div>
    }


    const EmployeeHome = () => {
        return <div>
            <div>Work hard play hard, employee</div>
            <div>
                <h2>Announcements: </h2>
                <div>{JSON.stringify(announcements)}</div>
            </div>
        </div>
    }

const ConditionalRendering = () => {
    switch (dashmode) {
        case "admin": return <div>Admin sheeesssh</div>;
        case "employee": return <EmployeeHome />;
        case "patient": return <PatientHome />;
        default: return <div>Hello</div>
    }
}

return (
    <div>
        {
            ConditionalRendering()
        }
    </div>
)
}

const mapStateToProps = state => ({
    announcements: state.announcements
})

export default connect(
    mapStateToProps,
    {
        setAnnouncement,
        emptyAnnouncement
    }
)(Home);