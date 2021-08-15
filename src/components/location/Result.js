import {useEffect, useState} from 'react';
import ResultItem from './ResultItem';

//styles
import { ResultCont } from '../../style/location/location__styles';

const Result = ({result, flyTo}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ConditionRender = () => {
        if(loading) {
            return <h1>loading...</h1>
        }

        if(result.length < 1) {
            return null
        }
        return result.map(item => <ResultItem key={item.place_name} detail={item} flyTo={flyTo}/>)
    }

    return (
        <ResultCont>
            {
                ConditionRender()
            }
        </ResultCont>
    );
}

export default Result;