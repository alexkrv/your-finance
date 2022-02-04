import { useSelector, } from 'react-redux';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import styles from 'App.module.scss';
import PageLogin from 'features/pageLogin/PageLogin';
import PageHome from 'features/pageHome/PageHome';
import Layout from 'features/layout/Layout';
import PageCashStructure from 'features/pageCashStructure/PageCashStructure';
import PageCashStatistics from 'features/pageCashStatistics/PageCashStatistics';
import RequireAuth from 'components/RequireAuth/RequireAuth';
import PageRegister from 'features/pageRegister/PageRegister';

import {
	ROUTE_LOGIN,
	ROUTE_CASH_CATEGORIES,
	ROUTE_HOME,
	ROUTE_INVESTMENTS,
	ROUTE_STATISTICS,
	ROUTE_REGISTRATION,
} from './constants/routes';

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
									<PageCashStructure />
								</RequireAuth>
							}
						/>
						<Route
							path={ROUTE_STATISTICS}
							element={
								<RequireAuth>
									<PageCashStatistics />
								</RequireAuth>
							}
						/>
						<Route
							path={ROUTE_INVESTMENTS}
							element={
								<RequireAuth>
									<div>ROUTE_INVESTMENTS</div>
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
