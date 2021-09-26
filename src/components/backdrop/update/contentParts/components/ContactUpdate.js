import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

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
    ContactUpdateCont
} from '../../../../../style/backdrop/update_component_styles';

const ContactUpdate = ({ info, updateSearchResult, setInfo, tab, result, backdrop }) => {

    const [contact, setContact] = useState({
        email: "",
        phone: "",
    });

    useEffect(() => {
        const { contact } = info;
        setContact({
            ...contact
        })

    }, [info])

    const onChangeHandler = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case "email": setContact({ ...contact, email: value }); break;
            case "phone": setContact({ ...contact, phone: value }); break;
            default: return;
        }

    }

    const updateHandler = () => {

        let body = {
            data: {
                contact,
            },
            tab
        };

        switch (backdrop.info.for) {
            case "patient": body = {
                ...body,
                patientId: info.detail._id,
            }; break;
            case "employee": body = {
                ...body,
                employeeId: info.detail._id
            }; break;
            default: return;
        }

        server.patch(`/hospital/${backdrop.info.for}/update`, body)
            .then(response => {
                console.log(response.data);
                updateSearchResult(result, response.data.raw);
                setInfo(backdrop.info.for, response.data[backdrop.info.for]);
                toast.success(response.data.message);
            }).catch(error => {
                if (error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error")
                }

            })
    }

    return (
        <ContactUpdateCont>
            Contact
            <div className="update-item-cont">
                <label>email: </label>
                <input
                    onChange={e => onChangeHandler(e, "email")}
                    value={contact.email} />
            </div>
            <div className="update-item-cont">
                <label>phone: </label>
                <input
                    onChange={e => onChangeHandler(e, "phone")}
                    value={contact.phone} />
            </div>
            <div>
                <button
                    onClick={updateHandler}>
                    update
                </button>
            </div>
        </ContactUpdateCont>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    result: state.result,
    backdrop: state.backdrop
})

export default connect(mapStateToProps, {
    updateSearchResult,
    setInfo
})(ContactUpdate);