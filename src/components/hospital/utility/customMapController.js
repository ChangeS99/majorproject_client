import { MapController } from 'react-map-gl';

export default class CustomMapController extends MapController {

    // Override the default double tap handler
    _onDoubleTap(event) {
        // Go to New York City
        console.log(event);
        //     this.updateViewport(this.getMapState(), {
        //       longitude: -74.0,
        //       latitude: 40.7,
        //       zoom: 10
        //     });
        //   }
    }
}