import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
// import {toast} from 'react-toastify';

//server
// import server from '../../../axiosConfig';

const RoleItem = ({ name, removeHandler }) => {

    return <div>
        <div>
            {name}
        </div>
        <div>
            <button onClick={() => removeHandler(name)}><i className="fas fa-times"></i></button>
        </div>
    </div>
}

const RoleList = ({ 
    userRoles, 
    roles,
     roleAddHandler, 
     roleRemoveHandler 
    }) => {

    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        if(roles.length >= 1) {
            setNewRole(roles[0].name);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const onChangeHandler = (e) => {
        const value = e.target.value;

        setNewRole(value);
    }

    

    return (
        <div>
            {
                userRoles.map(item => <RoleItem key={item} name={item} removeHandler={roleRemoveHandler}/>)
            }
            <div>
                add department
                <div>
                    <select
                        onChange={e => onChangeHandler(e)}
                        name="department" id="department">
                        {
                            roles.length >= 1 ?
                                roles.map(value => {
                                    return <option key={value._id} value={value.name}>{value.name}</option>
                                })
                                :
                                <option value="">no role created</option>
                        }
                    </select>
                    <button onClick={() => roleAddHandler(newRole)}>add</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps)(RoleList);