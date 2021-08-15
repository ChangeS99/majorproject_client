import { Redirect } from "react-router-dom"

import CreateFormAdmin from "./CreateFormAdmin"
import CreateFormEmployee from './CreateFormEmployee'
import CreateFormPatient from "./CreateFormPatient"

const Create = ({dashmode, crudmode, hospital}) => {


    const ConditionalRendering = () => {
        switch(dashmode) {
            case "admin": return <CreateFormAdmin />;
            case "employee": return <CreateFormEmployee hospital={hospital}/>;
            case "patient": return <CreateFormPatient hospital={hospital}/>;
            default: return <Redirect to={`/hospital/${hospital.name}/dashboard/about`}/>
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

export default Create;