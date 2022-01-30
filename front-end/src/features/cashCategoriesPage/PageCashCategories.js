import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Space, } from 'antd';

import styles from './PageCashCategories.module.scss';

import { getCategories, getBankItems, } from './PageCashCategoriesSlice';
import CategoryBlock from './CategoryBlock/CategoryBlock';
import CashCategoriesStarter from './CashCategoriesStarter/CashCategoriesStarter';
import { CATEGORY_TYPE_FROZEN, CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING } from '../../constants/default-values';
import NetBalance from './NetBalance/NetBalance';
import BankItem from './BankItem/BankItem';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import FormAddBankOrganization from './FormAddBankOrganization/FormAddBankOrganization';

const PageCashCategories = () => {
	const dispatch = useDispatch();
	const { categories: {
		incomes, spending, frozen,
	}, isCategoriesStarterFinished, bankItems, } = useSelector(state => state.cashCategories);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getBankItems());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			{isCategoriesStarterFinished ? null : <CashCategoriesStarter/>}
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
			<Space align='start'>
				{Object.keys(bankItems).map(bankId =>
					<BankItem
						key={bankId}
						bankId={bankId}
					/>)}
				<ButtonAddItem
					size='large'
					text={t('bankItem.addBank')}
					addItemFormElement={<FormAddBankOrganization/>}
				/>
			</Space>
		</div>
	);
};

export default PageCashCategories;