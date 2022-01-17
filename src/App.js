import { useSelector, } from 'react-redux';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import styles from './App.module.scss';
import {
	URL_LOGIN,
	URL_CASH_CATEGORIES,
	URL_HOME,
	URL_INVESTMENTS,
	URL_STATISTICS,
	URL_REGISTRATION,
} from './constants/urls';

import LoginPage from './features/loginPage/LoginPage';
import HomePage from './features/homePage/HomePage';
import Layout from './features/layout/Layout';
import CashCategoriesPage from './features/cashCategoriesPage/CashCategoriesPage';
import RequireAuth from './components/RequireAuth/RequireAuth';
import RegisterPage from './features/registerPage/registerPage';

const App = () => {
	const theme = useSelector( state => state.theme.value);

	return (
		<div className={styles.app} data-theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path={URL_HOME} element={<HomePage />} />
						<Route path={URL_LOGIN} element={<LoginPage />} />
						<Route path={URL_REGISTRATION} element={<RegisterPage />} />
						<Route
							path={URL_CASH_CATEGORIES}
							element={
								<RequireAuth>
									<CashCategoriesPage />
								</RequireAuth>
							}
						/>
						<Route
							path={URL_INVESTMENTS}
							element={
								<RequireAuth>
									<CashCategoriesPage />
								</RequireAuth>
							}
						/>
						<Route
							path={URL_STATISTICS}
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
