import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import server from '../../axiosConfig';

//action
import {
    setDetailHospital,
    setRoles, setDeps
} from '../../actions/hospital/information';

import About from '../../components/dashboard/About';
import Admin from '../../components/dashboard/Admin';
import Employee from "../../components/dashboard/Employee";
import Patient from "../../components/dashboard/Patient";

//styles
import { DashboardContainer } from "../../style/container";


const Dashboard = ({ hospital, setDetailHospital, setRoles, setDeps }) => {

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        server.get("/hospital/role/all")
        .then(roleRes => {
           
            server.get("/hospital/department/all")
            .then(depRes => {
                setRoles(roleRes.data.roles);
                setDeps(depRes.data.departments);
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error);
        })

        // return () => {
        //     removeRole(null, []);
        //     removeDep(null, []);
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDetailHospital()
            .then(result => {
                console.log(result);
                setLoading(false);
            })
            .catch(_ => {
                setError("Not authorized");
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const RenderUsingSwitch = () => {
        const { dashmode, crudmode } = params;

        if (dashmode) {
            switch (dashmode) {
                case "about": return <About dashmode={dashmode} hospital={hospital} />;
                case "admin": return <Admin
                    hospital={hospital}
                    dashmode={dashmode}
                    crudmode={crudmode} />;
                case "employee": return <Employee
                    hospital={hospital}
                    dashmode={dashmode}
                    crudmode={crudmode} />;
                case "patient": return <Patient
                    hospital={hospital}
                    dashmode={dashmode}
                    crudmode={crudmode} />;
                default: return null;
            }
        }
    }

    const ConditionalRendering = () => {
        if (loading) {
            return <h1>Loading</h1>
        } else if (error) {
            return <div>{error}</div>
        } else {
            return <div>{RenderUsingSwitch()}</div>
        }
    }

    return (
        <DashboardContainer>
            {error ? error : ConditionalRendering()}
        </DashboardContainer>
    )
}

const mapStateToProps = state => ({ hospital: state.hospital })

export default connect(mapStateToProps, {
    setDetailHospital,
    setRoles,
    setDeps
})(Dashboard);