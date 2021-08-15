// import { useEffect } from "react";

import { ResultItemCont } from "../../style/location/location__styles";

const ResultItem = ({ detail, flyTo }) => {

    // useEffect(() => {
    //     console.log("detail in result item: ", detail)
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // useEffect(() => {
    //     console.log(detail);
    // })

    return (
        <ResultItemCont
            onClick={() => {
                flyTo(detail.coordinates, detail)
            }}
        >
            {detail.place_name}
        </ResultItemCont>
    )
}

export default ResultItem;