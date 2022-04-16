import '../__mocks__/matchMedia.mock';
import { render, screen } from '@testing-library/react';
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';
import { Skeleton } from 'antd';

import HeaderMenu from '../HeaderMenu';
import { ROUTE_HOME } from '../../../../constants/routes';

describe('dummy test',() => {
	test('should print the HeaderMenu component', () => {
		render(
			<Suspense fallback={<Skeleton active/>}>
				<Provider store={store}>
					<I18nextProvider i18n={i18n}>
						<BrowserRouter>
							<Routes>
								<Route path={ROUTE_HOME} element={<HeaderMenu/>}/>
							</Routes>
						</BrowserRouter>
					</I18nextProvider>
				</Provider>
			</Suspense>
		);
		screen.debug();
	});
} );