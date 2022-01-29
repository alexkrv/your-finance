import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { Outlet, } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Space, } from 'antd';

import styles from './PageCashCategories.module.scss';

import { getCategories } from './PageCashCategoriesSlice';
import CategoryBlock from './CategoryBlock/CategoryBlock';
import CashCategoriesStarter from './CashCategoriesStarter/CashCategoriesStarter';
import { CATEGORY_TYPE_FROZEN, CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING } from '../../constants/default-values';
import NetBalance from './NetBalance/NetBalance';
import FormAddBankAccount from './FormAddBankAccount/FormAddBankAccount';
import BankItem from './BankItem/BankItem';

const mockData = [
	{ /*TODO fetch from back*/
		name: 'Tinkoff Bank',
		id: Math.random(),
		accounts: [
			{ name: 'Tinkoff Black', currencyId: 'RUB', value: 12345, id: Math.random() },
			{ name: 'Tinkoff Black USD', currencyId: 'USD', value: 12345, id: Math.random() },
			{ name: 'Tinkoff Black EUR', currencyId: 'EUR', value: 12345, id: Math.random() },
		] }
];

const PageCashCategories = () => {
	const dispatch = useDispatch();
	const { categories: { incomes, spending, frozen, }, isCategoriesStarterFinished, } = useSelector(state => state.cashCategories);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			{isCategoriesStarterFinished ? null : <CashCategoriesStarter/>}
			<Outlet/>
			<NetBalance/>
			<Space size='large' align='start'>
				{ (Boolean(incomes.length) || isCategoriesStarterFinished) && <CategoryBlock
					title={t('cashCategories.incomeTitle')}
					items={incomes}
					type={CATEGORY_TYPE_INCOME}
				/> }
				{ (Boolean(spending.length) || isCategoriesStarterFinished) && <CategoryBlock
					title={t('cashCategories.spendingTitle')}
					items={spending}
					type={CATEGORY_TYPE_SPENDING}
				/> }
				{ (Boolean(frozen.length) || isCategoriesStarterFinished) && <CategoryBlock
					title={t('cashCategories.frozenTitle')}
					items={frozen}
					type={CATEGORY_TYPE_FROZEN}
				/> }
			</Space>
			<Space>
				{mockData.map(bank =>
					<BankItem
						key={bank.id}
						bankName={bank.name}
						accounts={bank.accounts}
					/>)}
				{/*<ButtonAddItem size='large' text={t('cashCategories.addBank')}/>*/}
			</Space>
		</div>
	);
};

export default PageCashCategories;