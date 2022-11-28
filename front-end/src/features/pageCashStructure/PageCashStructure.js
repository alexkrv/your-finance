import { CATEGORY_TYPE_FROZEN, CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING } from 'constants/default-values';

import React from 'react';
import { useSelector, } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Space, Skeleton } from 'antd';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';

import { useGetCashCategoriesQuery } from '../../api';

import styles from './PageCashStructure.module.scss';

import CategoryBlock from './CategoryBlock/CategoryBlock';
import CashCategoriesStarter from './CashCategoriesStarter/CashCategoriesStarter';
import NetBalance from './NetBalance/NetBalance';
import FormAddBankOrganization from './FormAddBankOrganization/FormAddBankOrganization';
import BankItemsWrapper from './BankItemsWrapper/BankItemsWrapper';

const PageCashStructure = () => {
	const { categories: {
		income, spending, frozen,
	}, isCategoriesStarterFinished, } = useSelector(state => state.cashCategories);
	const { t } = useTranslation();
	const { isFetching } = useGetCashCategoriesQuery();

	return (
		<div className={styles.container}>
			{isCategoriesStarterFinished ? null : <CashCategoriesStarter/>}
			<NetBalance/>
			<Space size='large' align='start' direction='vertical'>
				{ isFetching ?
					<Skeleton style={{ width: 400 }} active/>
					: <Space size='small' align='start'>
						{ (Boolean(income.length) || isCategoriesStarterFinished) && <CategoryBlock
							title={t('cashCategories.incomeTitle')}
							items={income}
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
					</Space> }
				<Space align='start' direction='vertical'>
					<BankItemsWrapper/>
					<ButtonAddItem
						size='large'
						text={t('bankItem.addBank')}
						addItemFormElement={<FormAddBankOrganization/>}
					/>
				</Space>
			</Space>
		</div>
	);
};

export default PageCashStructure;