import { useEffect, useRef, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

export const useMapModifyHook = (map) => {
    const marker = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('dblclick', (e) => {
            e.preventDefault();

            if (marker.current) {
                marker.current.remove();
                marker.current = null;
                return;
            }
            // console.log(e);
            // const { lng, lat } = e.lngLat;
            // console.log('A dblclick event has occurred at ' + e.lngLat);
            marker.current = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map.current);
        })
    })

    return [{lat, lng, zoom} , marker];
}