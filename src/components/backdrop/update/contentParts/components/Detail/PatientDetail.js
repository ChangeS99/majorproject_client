import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import {toast} from 'react-toastify';

//action
import {
    updateSearchResult
} from '../../../../../../actions/hospital/information';
import {
    setInfo
} from '../../../../../../actions/ui/backdrop'

import server from '../../../../../../axiosConfig';

//component
import CustomMap from '../../../../components/CustomMap';

//style
// import {
//     DetailUpdateCont
// } from '../../../../../style/backdrop/update_component_styles';

const PatientDetailUpdate = ({ info, marker, tab, setInfo, updateSearchResult, result }) => {

    const [dob, onChange] = useState(new Date());
    const [address, setAddress] = useState({});
    const [searched, setSearched] = useState(false);



    useEffect(() => {
        const { detail } = info;
        setAddress(detail.address);

        if(detail.dob) {
            onChange(new Date(detail.dob))
        }

        return () => {
            setSearched(false);
        }
    }, [info]);

    const onClickHandler = () => {
        server.post("/location/coordinate/search", {
            lng: marker.lng,
            lat: marker.lat
        })
            .then(response => {
                console.log(response.data);
                const loc = response.data.location;
                setAddress({
                    coordinates: {
                        longitude: marker.lng,
                        latitude: marker.lat
                    },
                    country: loc.details.country.text,
                    district: loc.details.district.text,
                    region: loc.details.region.text,
                    place: loc.place_name});
                setSearched(true);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onChangeHandler = (e, type) => {
        const value = e.target.value

        switch (type) {
            case "text": setAddress({ ...address, text: value }); break;
            default: return;
        }

    }

    const updateHandler = () => {

        let data = {dob};
        if(searched) {
            data = {
                dob,
                address
            }
        }

        server.patch("/hospital/patient/update", {
            data: {
                ...data
            },
            patientId: info.detail._id,
            tab
        }).then(response => {
            console.log(response.data);
            updateSearchResult(result, response.data.raw);
            setInfo("patient", response.data.patient);
            toast.success(response.data.message);
        }).catch(error => {
            if(error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Network error")
            }
            
        })
    }

    return (
        <>
            <div className="update-item-cont">
                date of birth
                <div className="dob-cont">
                    <DateTimePicker
                        onChange={onChange}
                        disableClock={true}
                        value={dob}
                    />
                </div>
            </div>
            <div className="update-item-cont">
                address
                <div>
                    <CustomMap mrk={info.detail.address.coordinates}/>
                    <div>
                        <button
                            onClick={onClickHandler}
                            disabled={marker.lat ? false : true}>search</button>
                    </div>
                </div>
                <div>
                    {   
                        searched ?
                        <>
                            <label>address from map</label>
                            <input disabled value={address.place} />
                            <label>additional info</label>
                            <input
                                onChange={(e) => onChangeHandler(e, "text")}
                                type="text" value={address.text} />
                        </> : null
                    }

                </div>
            </div>
            <div>
                <button
                onClick={updateHandler}
                >update</button>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    marker: state.marker,
    result: state.result
})

export default connect(mapStateToProps, {
    setInfo,
    updateSearchResult,
})(PatientDetailUpdate);