import { Fragment } from 'react';
import { NavLink, useParams, Redirect } from 'react-router-dom';

// import Search from "./Search"

// import server from '../../axiosConfig';

//component
// import List from "./components/List";
import Find from './components/Find';
import Home from './components/Home';
// import Delete from './components/Delete';
import Create from './components/Create';

//styles
import { ContentAdminCont } from "../../style/dashboard/content__styles";
import {
    ContentNavBar
} from '../../style/container';
import {
    CrudLinkContainer
} from '../../style/navbar/navbar__styles';

const Employee = ({ dashmode, crudmode, hospital }) => {

    const params = useParams();
    // const history = useHistory();

    const ConditionalRendering = () => {
        if (!crudmode) {
            return <Home dashmode={dashmode} />
        }

        switch (crudmode) {
            case "find": return <Find
                dashmode={dashmode}
                crudmode={crudmode}
                hospital={hospital} />;
            case "create": return <Create
                dashmode={dashmode}
                crudmode={crudmode}
                hospital={hospital} />;
            // case "delete": return <Delete
            //     dashmode={dashmode}
            //     crudmode={crudmode}
            //     hospital={hospital}
            // />
            default: return <Redirect to={`/hospital/${hospital.name}/dashboard/employee`} />
        }
    }

    return (
        <ContentAdminCont>
            <ContentNavBar>
                <CrudLinkContainer>
                    {
                        hospital.name ?
                            <Fragment>
                                <div className="crud-link-item-container">
                                <NavLink
                                    to={`/hospital/${hospital.name}/dashboard/employee/find`}
                                    className={`link-items ${params.crudmode === "find" ? "active-link-items" : null}`}
                                    activeClassName={"active-link-items"}>
                                    Find
                                </NavLink>
                                </div>
                                
                                <div className="crud-link-item-container">
                                <NavLink
                                    to={`/hospital/${hospital.name}/dashboard/employee/create`}
                                    className={`link-items ${params.crudmode === "create" ? "active-link-items" : null}`}
                                    activeClassName={"active-link-items"}>
                                    Create
                                </NavLink>  
                                </div>
                                
                            </Fragment>
                            : null
                    }

                </CrudLinkContainer>
            </ContentNavBar>
            {
                ConditionalRendering()
            }
        </ContentAdminCont>
    )
}

export default Employee;