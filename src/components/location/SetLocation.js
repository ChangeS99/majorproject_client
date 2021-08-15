import { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import server from '../../axiosConfig';
import Result from './Result';

//action
import {
    registerLocation,
    placeMarker,
    resetMarker
} from '../../actions/hospital/location';


//styles
import { LocationCont, MapCont, SearchCont } from '../../style/location/location__styles';

const mapApiKey = process.env.REACT_APP_MAPBOX_API_KEY;

mapboxgl.accessToken = mapApiKey;


const SetLocation = ({ token, registerLocation, placeMarker, resetMarker }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    const [lng, setLng] = useState(78.47);
    const [lat, setLat] = useState(22.19);
    const [zoom, setZoom] = useState(3);
    const [mark, setMark] = useState({});
    // const [location, setLocation] = useState({});

    const [result, setResult] = useState([]);

    const [search, setSearch] = useState("");


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            // style: 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });


    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    useEffect(() => {
        if (!map.current) return;
        map.current.on('dblclick', (e) => {
            e.preventDefault();

            if (marker.current) {
                marker.current.remove();
                marker.current = null;
                setMark({})
                // placeMarker({});
                // map.current.triggerRepaint();
                return;
            }

            const { lng: lang, lat: lati } = e.lngLat;

            marker.current = new mapboxgl.Marker()
                .setLngLat([lang, lati])
                .addTo(map.current);
            // setLng(lng);
            // setLat(lat);
            setMark({
                lng: lang,
                lat: lati
            })
            // map.current.triggerRepaint();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mark.lng) {
            placeMarker(mark);
        }
        if (!mark.lng) {
            resetMarker();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mark])

    // const setMarkerInRedux = (coor) => {
    //     placeMarker({
    //         lng: coor.lang,
    //         lat: coor.lati
    //     })
    // }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        server.post("/location/search", {
            search
        }).then(response => {
            setResult(response.data);
        }).catch(error => {
            if (error.response) {
                // console.log(error.response.data.error)
            }
            // console.log(error);
        })
    }

    const flyToSearchResult = (coordinates, data) => {
        // setLocation(detail);
        // console.log(detail);
        registerLocation(data);
        const [lngRslt, latRslt] = coordinates;
        // + (Math.random() - 0.5) * 10,
        map.current.flyTo({
            center: [
                lngRslt,
                latRslt
            ],
            zoom: 15,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        map.current.triggerRepaint();
    }

    return (
        <LocationCont>
            <div className="heading_location">
                <h1>Set Location</h1>
                <p className="instruction_location">
                    You have to set a marker by double taping on the map
                    before clicking next.
                </p>
            </div>
            <div className="map_main_container">
                <MapCont>
                    <div ref={mapContainer} className="map-container" />
                </MapCont>
                <SearchCont>
                    <div className="searchbox_container">
                        <input
                            value={search}
                            type="text"
                            onChange={handleChange}
                        />
                        <button onClick={searchSubmitHandler}>
                            search
                        </button>
                    </div>
                    {result.length > 0 ? <Result result={result} flyTo={flyToSearchResult} /> : null}

                </SearchCont>
            </div>
        </LocationCont>
    );
}

export default connect((state) => {
    // console.log(state);
    return {
        state
    }
}, {
    registerLocation,
    placeMarker,
    resetMarker
})(SetLocation);