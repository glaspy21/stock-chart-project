import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from "react-redux";
import promise from "redux-promise";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";

const createStoreWithMiddleware = applyMiddleware( promise )( createStore );



ReactDOM.render(
<Provider store={ createStoreWithMiddleware( reducers )}>
        <App />
    </Provider>, 
document.getElementById('root'));


