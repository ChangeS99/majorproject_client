import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

//actions
import {
    placeMarker,
    resetMarker
} from '../../../actions/hospital/location';

const mapApiKey = process.env.REACT_APP_MAPBOX_API_KEY;
mapboxgl.accessToken = mapApiKey;

const CustomMap = ({ hospital, placeMarker, resetMarker, mrk }) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [mark, setMark] = useState({});

    useEffect(() => {
        if (map.current) return; // initialize map only once
        if (hospital) {
            const { location: loc } = hospital;
            const { coordinates } = loc;
            console.log(coordinates);
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [Number(coordinates.longitude), Number(coordinates.latitude)],
                zoom: zoom
            });
        }

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
        const { longitude: lang, latitude: lati } = mrk;
        marker.current = new mapboxgl.Marker()
            .setLngLat([lang, lati])
            .addTo(map.current);
        // setLng(lng);
        // setLat(lat);
        setMark({
            lng: lang,
            lat: lati
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (mark.lng) {
            placeMarker(mark);
        }
        if (!mark.lng) {
            resetMarker();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mark])

    useEffect(() => {
        return () => {
            resetMarker();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" style={{ width: "200px", height: "200px" }} />
        </div>
    );
}

const mapStateToProps = state => ({
    hospital: state.hospital
})

export default connect(mapStateToProps, {
    placeMarker,
    resetMarker
})(CustomMap);

