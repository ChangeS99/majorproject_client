import { NavLink } from 'react-router-dom';

//styles
import { DashNavCont } from '../../style/container';
import { DashLinkContainer } from '../../style/navbar/navbar__styles';

const DashboardNav = ({ hospital }) => {
    return (
        <DashNavCont>
            <DashLinkContainer>
                <div className="dash-link-item-container">
                    <NavLink
                        to={`/hospital/${hospital.name}/dashboard/about`}
                        className={"link-items"} activeClassName={"active-link-items"}>
                        About
                    </NavLink>
                </div>
                <div className="dash-link-item-container">
                    <NavLink
                        to={`/hospital/${hospital.name}/dashboard/admin`}
                        className={"link-items"}
                        activeClassName={"active-link-items"}>
                        Admin
                    </NavLink>
                </div>
                <div className="dash-link-item-container">
                    <NavLink
                        to={`/hospital/${hospital.name}/dashboard/employee`}
                        className={"link-items"}
                        activeClassName={"active-link-items"}>
                        Employee
                    </NavLink>
                </div>
                <div className="dash-link-item-container">
                    <NavLink
                        to={`/hospital/${hospital.name}/dashboard/patient`}
                        className={"link-items"}
                        activeClassName={"active-link-items"}>
                        Patient
                    </NavLink>
                </div>
            </DashLinkContainer>
        </DashNavCont>
    )
}

export default DashboardNav;