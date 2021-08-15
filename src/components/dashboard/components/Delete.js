import { Fragment, useState } from 'react';

import Search from '../Search';
import List from './List';

import server from '../../../axiosConfig';

//styles
import {
    ContentUtilityCont, ContentMainCont
} from '../../../style/dashboard/content__styles'

const Delete = ({ dashmode, crudmode }) => {

    const [data, setData] = useState([]);
    // const [mode, setMode] = useState("find");

    const submitHandler = (e, search) => {
        e.preventDefault();
        console.log(search);
        server.post(`/hospital/${dashmode}/search`, {
            search
        })
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
                // console.log(error.response.data.error);
            })
    }

    const listAllHandler = (e) => {
        server.post(`/hospital/${dashmode}/list`, {})
            .then(response => {
                setData(response.data.admins);
                console.log(response.data);
            })
            .catch(error => {
                setData([]);
                console.log(error.response.data.error);
            })
    }

    return (
        <Fragment>
            <ContentUtilityCont>
                <Search submitHandler={(e, search) => submitHandler(e, search)} />
                <div>
                    <button
                        onClick={(e) => listAllHandler(e)}
                    >All</button>
                </div>
            </ContentUtilityCont>
            <ContentMainCont>
                {
                    data.length >= 1 ? <List data={data} dashmode={dashmode} crudmode={crudmode}/> : null
                }
            </ContentMainCont>
        </Fragment>
    )
}

export default Delete;