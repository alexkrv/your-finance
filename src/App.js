import { useSelector, } from 'react-redux';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import styles from './App.module.scss';
import { URL_LOGIN, URL_CASH_CATEGORIES, } from './constants/urls';

import LoginPage from './features/loginPage/LoginPage';
import Layout from './features/layout/Layout';
import CashCategoriesPage from './features/cashCategoriesPage/CashCategoriesPage';
import RequireAuth from './components/RequireAuth/RequireAuth';

const App = () => {
	const theme = useSelector( state => state.theme.value);

	return (
		<div className={styles.app} data-theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						{/*TODO <Route path={URL_PUBLIC} element={<PublicPage />} />*/}
						<Route path={URL_LOGIN} element={<LoginPage />} />
						<Route
							path={URL_CASH_CATEGORIES}
							element={
								<RequireAuth>
									<CashCategoriesPage />
								</RequireAuth>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
