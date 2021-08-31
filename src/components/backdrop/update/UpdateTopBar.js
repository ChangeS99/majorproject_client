import { connect } from 'react-redux';

//component
import TopBar from './contentParts/TopBar';

//style
import {
    UpdateTopBarCont
} from '../../../style/backdrop/update_component_styles';

const UpdateTopBar = ({ info, tabClick, tab, backdrop }) => {

    const ConditionalRendering = () => {
        return <TopBar
            tab={tab}
            tabClick={tabClick}
        />
        // switch (backdrop.info.for) {
        //     case "patient": return <TopBarPatient
        //         tab={tab}
        //         tabClick={tabClick}
        //     />;
        //     default: return null;
        // }
    }

    return (
        <UpdateTopBarCont>
            {
                ConditionalRendering()
            }
        </UpdateTopBarCont>
    )
}

const mapStateToProps = state => ({
    info: state.info,
    backdrop: state.backdrop
})

export default connect(mapStateToProps)(UpdateTopBar);