import { Fragment, useEffect } from 'react';
import {connect} from 'react-redux';

import Search from '../Search';
import List from './List';

import server from '../../../axiosConfig';

import {
    setSearchResult
} from '../../../actions/hospital/information';
//styles
import {
    ContentUtilityCont, ContentMainCont
} from '../../../style/dashboard/content__styles'

const Find = ({ dashmode, crudmode, result, setSearchResult }) => {

    // const [data, setData] = useState([]);
    // const [mode, setMode] = useState("find");

    useEffect(() => {
        return () => {
            setSearchResult([])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                // setData(response.data);
                switch(dashmode) {
                    case "admin": setSearchResult(response.data.admins); break;
                    case "employee": setSearchResult(response.data.employees);break;
                    case "patient": setSearchResult(response.data.patients); break;
                    default: return;
                }
                
                console.log(response.data);
            })
            .catch(error => {
                // setData([]);

                if(error.response){
                    console.log(error.response.data.error);
                }
                
            })
    }

    return (
        <Fragment>
            <ContentUtilityCont>
                <Search submitHandler={(e, search) => submitHandler(e, search)} />
                <div className="filter-button-container">
                    <button
                        onClick={(e) => listAllHandler(e)}
                    >All</button>
                </div>
            </ContentUtilityCont>
            <ContentMainCont>
                {
                    result.length >= 1 ? <List data={result} dashmode={dashmode} crudmode={crudmode}/> : null
                }
            </ContentMainCont>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    result: state.result
})

export default connect(mapStateToProps, {
    setSearchResult
})(Find);