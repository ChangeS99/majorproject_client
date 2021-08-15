import { useState } from 'react';
import {connect} from 'react-redux';
import server from '../../../axiosConfig';

import { toast } from 'react-toastify';

import {
    setSearchResult
} from '../../../actions/hospital/information'

import { fields } from './utility';

const Announcement = () => {

    const [announce, setAnnounce] = useState({
        title: "",
        field: "global",
        detail: "",
    })

    const [search, setSearch] = useState({
        query: "",
        filter: "global"
    })

    const onChangeHandler = (e, type) => {
        const value = e.target.value;
        switch (type) {
            case "title": setAnnounce({ ...announce, title: value }); break;
            case "field": setAnnounce({ ...announce, field: value }); break;
            case "detail": setAnnounce({ ...announce, detail: value }); break;
            case "query": setSearch({ ...search, query: value }); break;
            case "filter": setSearch({ ...search, filter: value }); break;
            default: return;
        }
    }

    const createHandler = () => {
        console.log(announce);
        server.post("/hospital/admin/announcement/create", announce)
            .then(response => {
                console.log(response.data);
                toast.success(response.data.message);
            })
            .catch(error => {
                if (error.response) {
                    toast.error(error.response.data.error);
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
                        <label>title: </label>
                        <input
                            onChange={e => onChangeHandler(e, "title")}
                            type="text" />
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
                        <label>details: </label>
                        <input
                            onChange={e => onChangeHandler(e, "detail")}
                            type="text" />
                    </div>
                    <div>
                        <button
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