import { useEffect } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';


//component
import BackdropDetail from './BackdropDetail';

//styles
import {
    BackdropContainer
} from '../../style/backdrop/backdrop__styles'

//actions
import {
    setBackdrop
} from '../../actions/ui/backdrop'

const TransparentBlack = ({ backdrop, setBackdrop }) => {
    // console.log(backdrop);

    useEffect(() => {
        return () => {
            setBackdrop(false, {
                for: "none",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCloseHandler = () => {
        setBackdrop(false, { for: "none" })
    }

    const ConditionalRendering = () => {

        if(backdrop.show === true) {
            return <BackdropDetail
                backdrop={backdrop}
                onCloseHandler={onCloseHandler}>
            </BackdropDetail>;
        }
        // } else {
        //     return <Redirect to="/" />;
        // }
        // switch (backdrop.info.for) {
        //     case "patient": return <BackdropDetail
        //         backdrop={backdrop}
        //         onCloseHandler={onCloseHandler}>
        //     </BackdropDetail>;
        //     case "employee": return <BackdropDetail
        //         backdrop={backdrop}
        //         onCloseHandler={onCloseHandler}>
        //     </BackdropDetail>;
        //     case "none": return null;
        //     default: return <Redirect to="/" />;
        // }
    }

    return (
        <BackdropContainer backdrop={backdrop.show}>
            {ConditionalRendering()}
        </BackdropContainer>
    )
}

export default connect(null, {
    setBackdrop
})(TransparentBlack);