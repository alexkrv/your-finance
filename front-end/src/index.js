import React, { Suspense, } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Skeleton } from 'antd';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

import './i18n';

if (process.env.NODE_ENV === 'development') {
	const { worker } = require('./__mocks__/browser');
	worker.start();
}

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<Skeleton active/>}>
			<Provider store={store}>
				<App />
			</Provider>
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
