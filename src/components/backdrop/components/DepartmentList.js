import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import {toast} from 'react-toastify';

//server
// import server from '../../../axiosConfig';

const DepartmentItem = ({ name, removeHandler }) => {

    return <div>
        <div>
            {name}
        </div>
        <div>
            <button onClick={() => removeHandler(name)}><i className="fas fa-times"></i></button>
        </div>
    </div>
}

const DepartmentList = ({
    userDeps,
    departments,
    depAddHandler,
    depRemoveHandler
}) => {

    const [newDep, setNewDep] = useState("");

    useEffect(() => {
        if (departments.length >= 1) {
            setNewDep(departments[0].name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeHandler = (e) => {
        const value = e.target.value;

        setNewDep(value);
    }



    return (
        <div>
            {
                userDeps.map(item => <DepartmentItem key={item} name={item} removeHandler={depRemoveHandler} />)
            }
            <div>
                add department
                <div>
                    <select
                        onChange={e => onChangeHandler(e)}
                        name="department" id="department">
                        {
                            departments.length >= 1 ?
                                departments.map(value => {
                                    return <option key={value._id} value={value.name}>{value.name}</option>
                                })
                                :
                                <option value="">no department created</option>
                        }
                    </select>
                    <button onClick={() => depAddHandler(newDep)}>add</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps)(DepartmentList);