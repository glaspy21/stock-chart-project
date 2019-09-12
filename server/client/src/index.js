import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from './reducers'
import App from './components/App'


const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)) );


render(
  <Provider store={store}>
   <App />
  </Provider>,
document.getElementById("root"));