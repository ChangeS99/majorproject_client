import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import server from '../../../axiosConfig';

//actions
import { removeItemSearchResult, removeRole, removeDep } from '../../../actions/hospital/information';
import { setBackdrop } from '../../../actions/ui/backdrop';

//component
import TransparentBlack from '../../backdrop/TransparentBlack';

import { ListItemContainer } from '../../../style/list/list__styles';

const ListItem = ({
    roles,
    departments,
    forRole,
    forDep,
    data,
    dashmode,
    crudmode,
    result,
    removeItemSearchResult,
    removeDep,
    removeRole,
    setBackdrop,
    backdrop }) => {

    useEffect(() => {
        return () => {
            setBackdrop(false, {
                for: "none",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            {/* <div><button onClick={deleteHandler}><i class="far fa-trash-alt"></i></button></div> */}
        </div>
    }

    const EmployeeItem = () => {
        return <div 
        className="item-container" 
        onClick={() => {
            setBackdrop(true, {
                for: dashmode,
                data
            });
        }}>
            <div className="item-detail-container">
                <div className="item-name-container">
                    <div>firstname: {data.firstName}</div>
                    <div>middleName: {data.middleName.length >= 1 ? data.middleName : " "}</div>
                    <div>lastName: {data.lastName}</div>
                </div>
                <div className="item-id-container">
                    id: {data._id}
                </div>
                <div className="item-department-container">
                    department: {data.department}
                </div>
                <div className="item-department-container">
                    role: {data.role}
                </div>
            </div>
            {/* <div className="item-btn-container">
                <button onClick={deleteHandler}><i className="far fa-trash-alt"></i></button>
            </div> */}
        </div>
    }

    const PatientItem = () => {
        return <div
            className="item-container"
            onClick={() => {
                setBackdrop(true, {
                    for: dashmode,
                    data
                });
            }}>
            <div className="item-detail-container">
                <div className="item-name-container">
                    <div>firstname: {data.firstName}</div>
                    <div>middleName: {data.middleName.length >= 1 ? data.middleName : " "}</div>
                    <div>lastName: {data.lastName}</div>
                </div>
                <div className="item-id-container">
                    id: {data._id}
                </div>
                <div className="item-department-container">
                    department: {data.department}
                </div>
            </div>
            {/* <div className="item-btn-container">
                <button onClick={deleteHandler}><i className="far fa-trash-alt"></i></button>
            </div> */}
        </div>
    }

    const AboutItem = () => {
        return <div className="about-item-container">
            <div className="about-item-name">
                <p>{data.name}</p>
            </div>
            <div className="about-item-delete-btn-cont">
                <button onClick={aboutDeleteHandler}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    }

    return (
        <ListItemContainer>
            <TransparentBlack backdrop={backdrop} />
            {
                ConditionalRendering()
            }
        </ListItemContainer>
    )
}

const mapStateToProps = state => ({
    result: state.result,
    roles: state.roles,
    departments: state.departments,
    backdrop: state.backdrop
})

export default connect(mapStateToProps, {
    removeItemSearchResult,
    removeRole,
    removeDep,
    setBackdrop
})(ListItem);