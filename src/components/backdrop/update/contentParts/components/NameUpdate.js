import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {toast} from 'react-toastify';


//action
import {
    updateSearchResult
} from '../../../../../actions/hospital/information';
import {
    setInfo
} from '../../../../../actions/ui/backdrop';

import server from '../../../../../axiosConfig';

//style
import {
    NameUpdateCont
} from '../../../../../style/backdrop/update_component_styles';

const NameUpdate = ({ info, tab, result, updateSearchResult, setInfo, backdrop }) => {

    const [name, setName] = useState({
        firstName: "",
        middleName: "",
        lastName: ""
    });

    useEffect(() => {
        const {name: n} = info;
        setName({...n});
    }, [info])

    const onChangeHandler = (e, type) => {
        const value = e.target.value;
        switch(type) {
            case "firstName": setName({...name, firstName: value}); break;
            case "middleName": setName({...name, middleName: value}); break;
            case "lastName": setName({...name, lastName: value}); break;
            default: return;
        }
        
    }

    const onClickHandler = () => {

        let body ={};
        switch(backdrop.info.for){
            case "patient": body= {
                data: {
                    ...name
                },
                patientId: info.detail._id,
                tab
            }; break;
            case "employee": body= {
                data: {
                    ...name
                },
                employeeId: info.detail._id,
                tab
            }; break;
            default: return;
        }

        server.put(`/hospital/${backdrop.info.for}/update`, body).then(response => {
            console.log(response.data);
            updateSearchResult(result, response.data.raw);
            setInfo(backdrop.info.for, response.data[backdrop.info.for]);
            toast.success(response.data.message);
        }).catch(error => {
            if(error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Network error")
            }
            
        })
    }

    return <NameUpdateCont>
        NameUpdate
        <div className="update-item-cont">
            <label>firstname: </label>
            <input
                onChange={e => onChangeHandler(e, "firstName")}
                value={name.firstName} />
        </div>
        <div className="update-item-cont">
            <label>middlename: </label>
            <input
                onChange={e => onChangeHandler(e, "middleName")}
                value={name.middleName} />
        </div>
        <div className="update-item-cont">
            <label>lastname: </label>
            <input
                onChange={e => onChangeHandler(e, "lastName")}
                value={name.lastName} />
        </div>
        <div>
            <button onClick={onClickHandler}>Update</button>
        </div>
    </NameUpdateCont>
}

const mapStateToProps = state => ({
    info: state.info,
    result: state.result,
    backdrop: state.backdrop
})

export default connect(mapStateToProps, {
    updateSearchResult,
    setInfo
})(NameUpdate);