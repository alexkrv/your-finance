import { useSelector, } from 'react-redux';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import styles from './App.module.scss';
import {
	ROUTE_LOGIN,
	ROUTE_CASH_CATEGORIES,
	ROUTE_HOME,
	ROUTE_INVESTMENTS,
	ROUTE_STATISTICS,
	ROUTE_REGISTRATION,
	ROUTE_TUTORIAL,
} from './constants/routes';

import PageLogin from './features/pageLogin/PageLogin';
import PageHome from './features/pageHome/PageHome';
import Layout from './features/layout/Layout';
import PageCashCategories from './features/cashCategoriesPage/PageCashCategories';
import RequireAuth from './components/RequireAuth/RequireAuth';
import PageRegister from './features/pageRegister/PageRegister';
import CashCategoryStarterForm from './features/cashCategoriesPage/СashCategoryStarterForm/CashCategoryStarterForm';

const App = () => {
	const theme = useSelector( state => state.theme.value);

	return (
		<div className={styles.app} data-theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path={ROUTE_HOME} element={<PageHome />} />
						<Route path={ROUTE_LOGIN} element={<PageLogin />} />
						<Route path={ROUTE_REGISTRATION} element={<PageRegister />} />
						<Route
							path={ROUTE_CASH_CATEGORIES}
							element={
								<RequireAuth>
									<PageCashCategories />
								</RequireAuth>
							}
						>
							<Route path={ROUTE_TUTORIAL} element={<CashCategoryStarterForm/>}/>
						</Route>
						<Route
							path={ROUTE_INVESTMENTS}
							element={
								<RequireAuth>
									<PageCashCategories />
								</RequireAuth>
							}
						/>
						<Route
							path={ROUTE_STATISTICS}
							element={
								<RequireAuth>
									<PageCashCategories />
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
