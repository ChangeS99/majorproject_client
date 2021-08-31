import ReactDOM from 'react-dom';

import Modal from 'react-modal';

//style components
import { ThemeProvider } from 'styled-components';

//react redux 
import { Provider } from 'react-redux';

//redux and thunk
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './app';

//import reducers 
import reducer from './reducers';

import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';

//style
import {theme} from './style/theme';

//create store
const store = createStore(reducer, applyMiddleware(thunk));

Modal.setAppElement('#root');

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);