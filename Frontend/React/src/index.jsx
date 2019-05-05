import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './_store/store';
import { App } from './_views/App';

//// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();
const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);