import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

import server from '../../axiosConfig';

//action
import {
    activateHospitalData,
    setHospital
} from '../../actions/hospital/information';

//validator
import { hospitalConfigureValidator } from '../../validators/hospital';
import { particularTypeError } from '../../validators';
import { InformationCont } from '../../style/hospital/hospital__styles';
import { InformationForm } from '../../style/form';
import { SubmitButton } from '../../style/button';

const Information = ({ hospital, marker, emails, token, information, activateHospitalData, setHospital }) => {
    const history = useHistory();
    // const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        region: "",
        district: "",
        place: "",
        pincode: "",
        text: "",
        phone: "",
        hospitalEmail: "",
        password: "",
    });

    const [errorObj, setErrorObj] = useState({});

    useEffect(() => {
        server.post("/location/coordinate/search", {
            ...marker
        }).then(response => {
            const result = response.data.location;
            const details = result.details;
            setFormData({
                ...formData,
                hospitalEmail: emails.hospitalEmail,
                place: result.place_name,
                country: details.country.text,
                region: details.region.text,
                district: details.district.text,
            })
        }).catch(error => {
            console.log(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [marker])

    const handleInputChange = (e, element) => {
        const value = e.target.value;
        switch (element) {
            case "name": setFormData({ ...formData, name: value }); break;
            case "country": setFormData({ ...formData, country: value }); break;
            case "region": setFormData({ ...formData, region: value }); break;
            case "district": setFormData({ ...formData, district: value }); break;
            case "place": setFormData({ ...formData, place: value }); break;
            case "pincode": setFormData({ ...formData, pincode: value }); break;
            case "text": setFormData({ ...formData, text: value }); break;
            case "phone": setFormData({ ...formData, phone: value }); break;
            case "hospitalEmail": setFormData({ ...formData, hospitalEmail: value }); break;
            case "password": setFormData({ ...formData, password: value }); break;
            default: return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("formData: ", formData);
        const isValidated = hospitalConfigureValidator(formData);
        if (isValidated.error) {
            setErrorObj(isValidated);
        } else {
            server.post("/location/pincode/search", {
                pincode: formData.pincode,
                country: formData.country,
                state: formData.region
            })
                .then(response => {
                    setErrorObj({});
                    const { lng, lat } = marker;
                    return activateHospitalData(token, formData,
                        {
                            lat: `${lat}`,
                            lng: `${lng}`
                        })
                })
                .then(result => {
                    return setHospital()
                })
                .then(result => {
                    history.push(`/hospital/${result.name}/dashboard/about`)
                })
                .catch(error => {
                    if (error.response) {
                        toast.error(error.response.data.error);
                        setErrorObj({
                            error: error.response.data.error
                        })
                    } else {
                        setErrorObj({
                            error: "Network error",
                            path: "network"
                        })
                    }
                })
                .catch(error => {
                    if (error.response) {
                        toast.error(error.response.data.error);
                        setErrorObj({
                            error: error.response.data.error,
                            path: "pincode"
                        })
                    } else {
                        toast.error("Network error.");
                        setErrorObj({
                            error: "Network error",
                            path: "network"
                        })
                    }
                })
        }

        console.log(errorObj);
    }

    return (
        <InformationCont>
            <div className="heading_information">
                <h1>Set Information</h1>
                <p className="instruction_information">
                    Fill in details of your hospital.
                </p>
            </div>
            {particularTypeError(errorObj, "server")}
            {particularTypeError(errorObj, "pincode")}
            <InformationForm>
                <div className="formComponent">
                    {particularTypeError(errorObj, "name")}
                    <div className="input">
                        <label htmlFor="name">name</label>
                        <input
                            onChange={(e) => handleInputChange(e, "name")}
                            id="name" name="name" type="text" />
                    </div>
                </div>
                <div className="location_parts">
                    <div className="location_part">
                        <div className="formComponent">
                            {particularTypeError(errorObj, "country")}
                            <div className="input">
                                <label htmlFor="country">country</label>
                                <input
                                    disabled
                                    value={formData.country}
                                    onChange={(e) => handleInputChange(e, "country")}
                                    id="country" name="country" type="text" />
                            </div>
                        </div>
                        <div className="formComponent">
                            {particularTypeError(errorObj, "region")}
                            <div className="input">
                                <label htmlFor="region">region</label>
                                <input
                                    disabled
                                    value={formData.region}
                                    onChange={(e) => handleInputChange(e, "region")}
                                    id="region" name="region" type="text" />
                            </div>
                        </div>
                        <div className="formComponent">
                            {particularTypeError(errorObj, "district")}
                            <div className="input">
                                <label htmlFor="district">district</label>
                                <input
                                    disabled
                                    value={formData.district}
                                    onChange={(e) => handleInputChange(e, "district")}
                                    id="district" name="district" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="location_part">
                        <div className="formComponent">
                            {particularTypeError(errorObj, "place")}
                            <div className="input">
                                <label htmlFor="place">place</label>
                                <input
                                    disabled
                                    value={formData.place}
                                    onChange={(e) => handleInputChange(e, "place")}
                                    id="place" name="place" type="text" />
                            </div>
                        </div>
                        <div className="formComponent">
                            {particularTypeError(errorObj, "pincode")}
                            <div className="input">
                                <label htmlFor="pincode">pincode</label>
                                <input
                                    value={formData.pincode}
                                    onChange={(e) => handleInputChange(e, "pincode")}
                                    id="pincode" name="pincode" type="text" />
                            </div>
                        </div>
                        <div className="formComponent">
                            {particularTypeError(errorObj, "text")}
                            <div className="input">
                                <label htmlFor="text">address</label>
                                <input
                                    value={formData.text}
                                    onChange={(e) => handleInputChange(e, "text")}
                                    id="text" name="text" type="textarea" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact_parts">
                    <div className="formComponent">
                        {particularTypeError(errorObj, "phone")}
                        <div className="input">
                            <label htmlFor="phone">phone</label>
                            <input
                                value={formData.phone}
                                onChange={(e) => handleInputChange(e, "phone")}
                                id="phone" name="phone" type="text" />
                        </div>
                    </div>
                    <div className="formComponent">
                        {particularTypeError(errorObj, "hospitalEmail")}
                        <div className="input">
                            <label htmlFor="hospitalEmail">email</label>
                            <input
                                disabled
                                value={formData.hospitalEmail}
                                onChange={(e) => handleInputChange(e, "hospitalEmail")}
                                id="hospitalEmail" name="hospitalEmail" type="email" />
                        </div>
                    </div>
                    <div className="formComponent">
                        {particularTypeError(errorObj, "password")}
                        <div className="input">
                            <label htmlFor="password">password</label>
                            <input
                                value={formData.password}
                                onChange={(e) => handleInputChange(e, "password")}
                                id="hospitalEmail" name="password" type="password" />
                        </div>
                    </div>
                </div>
                <div className="formComponent submit">
                    <SubmitButton onClick={handleSubmit}>submit</SubmitButton>
                </div>
            </InformationForm>
        </InformationCont>
    )
}

const mapStateToProps = state => ({
    marker: state.marker,
    information: state.information,
    hospital: state.hospital
})

export default connect(mapStateToProps, {
    activateHospitalData,
    setHospital
})(Information);