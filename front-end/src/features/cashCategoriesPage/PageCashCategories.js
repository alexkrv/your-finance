import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Outlet, } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';

import styles from './PageCashCategories.module.scss';

import { getCategories } from './PageCashCategoriesSlice';
import CategoryBlock from './CategoryBlock/CategoryBlock';
import CashCategoriesStarter from './CashCategoriesStarter/CashCategoriesStarter';

const PageCashCategories = () => {
	const dispatch = useDispatch();
	const { categories: { incomes, spending, frozen, }, isCategoriesStarterFinished, } = useSelector(state => state.cashCategories);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			{isCategoriesStarterFinished ? <div>CATEGORIES</div> : <CashCategoriesStarter/>}
			<Outlet/>
			<Space size='middle' align='start'>
				{ Boolean(incomes.length) && <CategoryBlock
					title={t('cashCategories.incomeTitle')}
					items={incomes}
					addItemHandler={() => console.log(/*TODO*/'ADD ITEM')}
				/> }
				{ Boolean(spending.length) && <CategoryBlock
					title={t('cashCategories.spendingTitle')}
					items={spending}
					addItemHandler={() => console.log(/*TODO*/'ADD ITEM')}
				/> }
				{ Boolean(frozen.length) && <CategoryBlock
					title={t('cashCategories.frozenTitle')}
					items={frozen}
					addItemHandler={() => console.log(/*TODO*/'ADD ITEM')}
				/> }
			</Space>
		</div>
	);
};

export default PageCashCategories;