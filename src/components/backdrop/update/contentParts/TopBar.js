import {connect} from 'react-redux';

const TopBar = ({info, tabClick, tab}) => {
    return <>
         {
                Object.keys(info).map(item => {
                    return <div
                        onClick={_ => tabClick(item)}
                        className={`${tab === item ? "active-tab" : null}`}
                        key={item}>{item}</div>
                })
            }
    </>
}

const mapStateToProps = state => {
    return {
        info: state.info
    }
}

export default connect(mapStateToProps)(TopBar);