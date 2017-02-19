import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { store } from '../../lib/redux'

const AppProvider = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default AppProvider;
