import { useState } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import server from '../../../axiosConfig';

import { toast } from 'react-toastify';

import {
    setSearchResult
} from '../../../actions/hospital/information'

import { fields } from './utility';

const Announcement = () => {

    const [announce, setAnnounce] = useState({
        title: "",
        field: "everyone",
        detail: "",
    })

    const [specific, setSpecific] = useState({
        email: "",
        show: false
    })

    const [search, setSearch] = useState({
        query: "",
        filter: "everyone"
    })

    const [btnState, setBtnState] = useState({
        text: "create",
        disabled: false
    })

    const onChangeHandler = (e, type) => {
        const value = e.target.value.trim();
        switch (type) {
            case "title": setAnnounce({ ...announce, title: value }); break;
            case "field": setAnnounce({ ...announce, field: value }); break;
            case "detail": setAnnounce({ ...announce, detail: value }); break;
            case "specific": setSpecific({ ...specific, email: value }); break;
            case "query": setSearch({ ...search, query: value }); break;
            case "filter": setSearch({ ...search, filter: value }); break;
            default: return;
        }
    }

    const createHandler = () => {
        let body = { ...announce }
        if (specific.show) {
            if (!specific.email.length >= 1) {
                toast.error("Please provide an specific email.");
                return;
            }

            if (announce.field === "everyone") {
                toast.error("Specific announcement can only be sent to an employee or patient");
                return;
            }
            body = { ...body, specific: specific.email }
        }

        setBtnState({ text: "creating", disabled: true });

        server.post("/hospital/admin/announcement/create", body)
            .then(response => {
                console.log(response.data);
                toast.success(response.data.message);
                setBtnState({ text: "create", disabled: false });
            })
            .catch(error => {
                if (error.response) {
                    toast.error(error.response.data.error);
                    setBtnState({ text: "create", disabled: false });
                    console.log(error.response.data)
                } else {
                    console.log("Network Error.")
                }
            })
    }

    const searchHandler = (e) => {
        e.preventDefault();
        server.post("/hospital/admin/announcement/search", search)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data.error)
                } else {
                    console.log("Network error.")
                }
            })
    }

    return (
        <div>
            Announcement
            <div>
                Create Announcement
                <div>
                    <div>
                        <div>
                            <div>
                                <label>title: </label>
                                <input
                                    onChange={e => onChangeHandler(e, "title")}
                                    type="text" />
                            </div>
                            <div>
                                <label htmlFor="field">for: </label>
                                <select
                                    onChange={e => onChangeHandler(e, "field")}
                                    name="field" id="field">
                                    {
                                        Object.values(fields).map(value => {
                                            return <option key={value} value={value}>{value}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>details: </label>
                            <input
                                onChange={e => onChangeHandler(e, "detail")}
                                type="text" />
                        </div>
                    </div>
                    <div>
                        <div>
                            Specific email:
                            <Switch
                                checked={specific.show}
                                onChange={(checked) => { setSpecific({ ...specific, show: checked }) }}
                            />
                        </div>
                        <div>
                            {
                                specific.show ?
                                    <>
                                        <label>email: </label>
                                        <input type="email" onChange={e => onChangeHandler(e, "specific")}></input>
                                    </>
                                    : null
                            }
                        </div>
                    </div>
                    <div>
                        <button
                            disabled={btnState.disabled}
                            onClick={createHandler}
                        >create</button>
                    </div>
                </div>

            </div>
            <div>
                Find
                <div>
                    <div>
                        <input
                            onChange={e => onChangeHandler(e, "query")}
                            type="text" />
                    </div>
                    <div>
                        <label>for: </label>
                        <select
                            onChange={e => onChangeHandler(e, "filter")}
                            name="for" id="for"
                        >
                            {
                                Object.values(fields).map(item => {
                                    return <option
                                        key={item}
                                        value={item}
                                    >{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={searchHandler}
                        >search</button>
                    </div>
                </div>
                <div>
                    results
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, {
    setSearchResult
})(Announcement);