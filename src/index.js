import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './redux/store/configureStore';
import App from './components/app/app.jsx';

const store = configureStore({});

ReactDOM.render(
    <Provider store={ store }>
		<App />
    </Provider>,
    document.getElementById('root')
);
