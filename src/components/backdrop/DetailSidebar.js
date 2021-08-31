
//style
import { DetailSidebarCont } from "../../style/backdrop/backdrop__styles";

const DetailSidebar = ({ changeMode, mode }) => {

    const onClickHandler = (e, type) => {
        changeMode(e, type);
    }

    return <DetailSidebarCont>
        <div
            onClick={e => onClickHandler(e, "info")}
            className={`detail-sidebar-item ${mode==="info" ? "detail-sidebar-active": null}`}>
            info
        </div>
        <div
            onClick={e => onClickHandler(e, "update")}
            className={`detail-sidebar-item ${mode==="update" ? "detail-sidebar-active": null}`}>
            update
        </div>
        <div
            onClick={e => onClickHandler(e, "delete")}
            className={`detail-sidebar-item ${mode==="delete" ? "detail-sidebar-active": null}`}>
            delete
        </div>
    </DetailSidebarCont>
}

export default DetailSidebar;