import { connect } from 'react-redux';
import { toast } from 'react-toastify';

//action
import { removeItemSearchResult } from '../../../actions/hospital/information';
import { setBackdrop, setInfo } from '../../../actions/ui/backdrop';

import server from '../../../axiosConfig';

const DeleteOption = ({ removeItemSearchResult, setBackdrop, backdrop, info, result }) => {

    const onClickHandler = (type) => {
        const makeRequest = () => {
            server.delete(`/hospital/${backdrop.info.for}/delete`, {
                data: {
                    _id: info.detail._id
                }
            }).then(response => {
                toast.success(response.data.message);
                removeItemSearchResult(result, {_id: info.detail._id});
                setInfo({});
                setBackdrop({
                    show: false,
                    info: {
                        for: "none"
                    }
                });
            }).catch(error => {
                if (error.response) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Network error.")
                }
            })
        }

        if (type === "yes") {
            makeRequest();
        } else {
            return
        }
    }

    return (
        <div>
            <div>
                Are you sure you want to delete this document?
            </div>
            <div>
                <div>
                    <button
                        onClick={e => onClickHandler("yes")}
                    >Yes</button>
                </div>
                <div>
                    <button
                        onClick={e => onClickHandler("no")}
                    >No</button>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    backdrop: state.backdrop,
    info: state.info,
    result: state.result
})

export default connect(mapStateToProps, {
    removeItemSearchResult,
    setBackdrop
})(DeleteOption);