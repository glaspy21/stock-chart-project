import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Chart from './components/Chart'



render(
	<Chart />,
document.getElementById("root"));