import { useState, useEffect, useCallback, Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

//styles
import { NavContainer } from '../../style/container';
import { LinkContainer } from '../../style/navbar/navbar__styles';

const Navbar = ({ children, hospital, user }) => {
    const location = useLocation();

    const [userExist, setUserExist] = useState(false);
    const [hospitalExist, setHospitalExist] = useState(false);

    const lenHosp = useCallback(() => {
        return Object.keys(hospital).length;
    }, [hospital]);

    const lenUser = useCallback(() => {
        return Object.keys(user).length;
    }, [user]);

    useEffect(() => {
        console.log("Its running")
        if (lenUser() > 1) {
            setUserExist(true)
            if (lenHosp() > 1) {
                setHospitalExist(true);
            }
        }
    }, [user, hospital, lenHosp, lenUser]);


    const RenderUserLinks = () => {
        if (userExist) {
            return <Fragment>
                <div className="link-item-container">
                    <NavLink to="/" exact className={"link-items"} activeClassName={"active-link-items"}>Home</NavLink>
                </div>
            </Fragment>
        } else {
            return <div className="link-item-container">
                <NavLink to="/auth/signin" className={"link-items"} activeClassName={"active-link-items"}>Sign in</NavLink>
            </div>
        }
    }

    const RenderHospitalLinks = () => {
        if (hospitalExist) {
            return <div className="link-item-container">
                <NavLink
                    to={`/hospital/${hospital.name}/dashboard/about`}
                    className={`link-items ${location.pathname.includes("dashboard") ? "active-link-items" : null}`}
                    activeClassName={"active-link-items"}>
                    {hospital.name} dashboard
                </NavLink>
            </div>
        } else {
            return <div className="link-item-container">
                <NavLink to="/hospital/register" className={"link-items"} activeClassName={"active-link-items"}>Register Hospital</NavLink>
            </div>
        }
    }

    const RenderProfileLinks = () => {
        return userExist && <div className="link-item-profile-container">
            <div>
                {user.username}
            </div>
            {/* <NavLink
                    to={`/profile`}
                    className={`link-items ${location.pathname.includes("profile") ? "active-link-items" : null}`}
                    activeClassName={"active-link-items"}>
                    {user.username}
                </NavLink> */}
        </div>
    }

    return (
        <NavContainer>
            <LinkContainer>
                {
                    RenderUserLinks()
                }
                {
                    RenderHospitalLinks()
                }
                {
                    RenderProfileLinks()
                }
            </LinkContainer>
        </NavContainer>
    )
}

export default Navbar;