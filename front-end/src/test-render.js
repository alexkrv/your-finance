import './__mocks__/matchMedia.mock';
import { render, } from '@testing-library/react';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import { Skeleton } from 'antd';

const AllTheProviders = ({ children }) => {
	return (
		<Suspense fallback={<Skeleton active/>}>
			<Provider store={store}>
				<I18nextProvider i18n={i18n}>
					{children}
				</I18nextProvider>
			</Provider>
		</Suspense>
	);
};

const customRender = (ui, options) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export * from '@testing-library/jest-dom';

export { customRender as render };
