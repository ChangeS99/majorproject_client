import {connect} from 'react-redux';


//components
import InfoMode from './InfoMode';
import UpdateMode  from './UpdateMode';
import DeleteMode from './DeleteMode';

//style
import { DetailMainCont } from "../../style/backdrop/backdrop__styles";

const DetailMain = ({mode, backdrop}) => {

    const ConditionalRendering = () => {
        switch(mode) {
            case "info": return <InfoMode/>;
            case "update": return <UpdateMode />;
            case "delete": return <DeleteMode />;
            default: return <InfoMode />;
        }
    }

    return (
        <DetailMainCont>
            {
                ConditionalRendering()
            }
        </DetailMainCont>
    )
}

const mapStateToProps = state => ({
    backdrop: state.backdrop
})

export default connect(mapStateToProps)(DetailMain);