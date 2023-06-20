import { BrowserRouter, Routes, Route,  } from 'react-router-dom';

import { render, screen } from '../../../../test-render';
import HeaderMenu from '../HeaderMenu';
import { ROUTE_HOME } from '@root/constants/routes';
import { TEST_ID_THEME_SWITCHER } from '@root/constants/test-ids';

describe('HeaderMenu test',() => {
	test('should render ThemeSwitcher component', async () => {
		render(
			<BrowserRouter>
				<Routes>
					<Route path={ROUTE_HOME} element={<HeaderMenu/>}/>
				</Routes>
			</BrowserRouter>
		);
		const themeSwitcher = await screen.findByTestId(TEST_ID_THEME_SWITCHER);
		expect(themeSwitcher).toBeInTheDocument();

		screen.debug();
	});
} );