// import { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import server from '../../../axiosConfig';

import { removeItemSearchResult, removeRole, removeDep } from '../../../actions/hospital/information';

import { ListItemContainer } from '../../../style/list/list__styles';

const ListItem = ({ roles, departments, forRole, forDep, data, dashmode, crudmode, result, removeItemSearchResult, removeDep, removeRole }) => {

    // const [deletebtnText, setDeleteBtnText] = useState("delete");

    const ConditionalRendering = () => {
        switch (dashmode) {
            case "admin": return <AdminItem />;
            case "employee": return <EmployeeItem />;
            case "patient": return <PatientItem />;
            case "about": return <AboutItem />;
            default: return null;
        }
    }

    const deleteHandler = () => {
        
        server.delete(`/hospital/${dashmode}/delete`, {
            data: {
                _id: data._id
            }
        })
            .then(response => {
                removeItemSearchResult(result, data);
                toast.success(response.data.message);
                
            })
            .catch(error => {
                
                if (error.response) {
                    toast.error(error.response.data.error)
                } else {
                    toast.error("Network error");
                }

            })
    }

    const aboutDeleteHandler = () => {
        

        const conditionStr = forRole ? 'role' : 'department';

        server.delete(`/hospital/${conditionStr}/delete`, {
            data: {
                _id: data._id,
            }
        })
            .then(response => {
                console.log(response.data);
                if (response.data.isRole) {
                    removeRole(roles, response.data.roles);
                    toast.success(response.data.message);
                    
                }
                if (response.data.isDep) {
                    removeDep(departments, response.data.departments);
                    toast.success(response.data.message);
                  
                }

            })
            .catch(error => {
                
                if (error.response) {
                    toast.error(error.response.data.error)
                } else {
                    toast.error("Network error");
                }

            })
    }

    const AdminItem = () => {
        return <div>
            <div>name: {data.username}</div>
            <div><button onClick={deleteHandler}><i class="far fa-trash-alt"></i></button></div>
        </div>
    }

    const EmployeeItem = () => {
        return <div>
            <div>
                <div>
                    firstname: {data.firstName}
                    middleName: {data.middleName}
                    lastName: {data.lastName}
                </div>
                <div>
                    id: {data._id}
                </div>
            </div>
            <div>
                <button onClick={deleteHandler}><i class="far fa-trash-alt"></i></button>
            </div>
        </div>
    }

    const PatientItem = () => {
        return <div>
            <div>
                <div>
                    firstname: {data.firstName}
                    middleName: {data.middleName}
                    lastName: {data.lastName}
                </div>
                <div>
                    id: {data._id}
                </div>
                <div>
                    department: {data.department}
                </div>
            </div>
            <div>
                <button onClick={deleteHandler}><i class="far fa-trash-alt"></i></button>
            </div>
        </div>
    }

    const AboutItem = () => {
        return <div className="about-item-container">
            <div className="about-item-name">
                <p>{data.name}</p>
            </div>
            <div className="about-item-delete-btn-cont">
                <button onClick={aboutDeleteHandler}>
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    }

    return (
        <ListItemContainer>
            {
                ConditionalRendering()
            }
        </ListItemContainer>
    )
}

const mapStateToProps = state => ({
    result: state.result,
    roles: state.roles,
    departments: state.departments
})

export default connect(mapStateToProps, {
    removeItemSearchResult,
    removeRole,
    removeDep
})(ListItem);