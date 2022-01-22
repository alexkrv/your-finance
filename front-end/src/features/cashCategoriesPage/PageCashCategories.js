import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, Outlet, } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import styles from './PageCashCategories.module.scss';

import { getCategories } from './PageCashCategoriesSlice';
import { ROUTE_TUTORIAL } from '../../constants/routes';
import CategoryBlock from './CategoryBlock/CategoryBlock';
import { useTranslation } from 'react-i18next';

const PageCashCategories = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { incomes, } = useSelector(state => state.cashCategories.categories);// TODO temp
	const { t } = useTranslation();
	const [isTutorialCompleted, ] = useLocalStorage('isTutorialCompleted', false);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		if(!isTutorialCompleted) {
			navigate(ROUTE_TUTORIAL);
		}
	}, [isTutorialCompleted]);

	return (
		<div className={styles.container}>
			{isTutorialCompleted && <div>CATEGORIES</div>}
			<Outlet/>
			<CategoryBlock
				title={t('cashCategories.incomeTitle')}
				items={incomes}
				addItemHandler={() => console.log(/*TODO*/'ADD ITEM')}
			/>
		</div>
	);
};

export default PageCashCategories;