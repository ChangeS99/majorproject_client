import { BrowserRouter as Router } from "react-router-dom";
import Navigator from "./views/Navigator";

import { GlobalStyle } from "./style/globalStyle";

import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => {
    return <Router>
        <GlobalStyle />
        <Navigator />
    </Router>
}

export default App;