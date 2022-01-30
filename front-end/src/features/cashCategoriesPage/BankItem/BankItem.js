import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Space, } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './BankItem.module.scss';

import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import { Card } from 'components/Card/Card';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import FormAddBankAccount from '../FormAddBankAccount/FormAddBankAccount';
import { removeBankAccount, removeBankOrganization, } from '../PageCashCategoriesSlice';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';

const BankItem = ({ bankId, }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { bankItems } = useSelector(state => state.cashCategories);
	const confirmBankAccountRemoving = (accountId) => dispatch(removeBankAccount({ bankId, accountId }));
	const confirmBankRemoving = () => dispatch(removeBankOrganization(bankId));

	return (
		<Card className={styles.card}>
			<Space size='small' direction='horizontal' className={styles.header}>
				<Avatar size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 }}/>
				<div className={styles.metaContainer}>
					<div className={styles.bankName}>
						{bankItems[bankId]?.name || t('common.unknown')}
						<ButtonDeleteItem
							confirmationPlacement="right"
							confirmationCancelText={t('common.keep')}
							confirmationOkText={t('common.remove')}
							onConfirm={confirmBankRemoving}
							title={t('common.sureToRemove')}
							iconClassName={styles.deleteBank}
							afterActionText={t('bankItem.bankRemoved')}
						/>
					</div>
					<div className={styles.bankTotalValue}>
						{t('cashCategories.netBalance')}
						&nbsp;<FinancialValue value={123123/*TODO*/} currencyId={baseCurrencyKey}/>
					</div>
				</div>
			</Space>
			<Space size='middle' direction='horizontal' wrap>
				{bankItems[bankId]?.accounts.map( account => <div key={account.id} className={styles.metaContainer}>
					<div className={styles.nameContainer}>
						<div className={styles.accountName}>
							{account.name}
						</div>
						<ButtonDeleteItem
							confirmationPlacement="right"
							confirmationCancelText={t('common.keep')}
							confirmationOkText={t('common.remove')}
							onConfirm={() => confirmBankAccountRemoving(account.id)}
							title={t('common.sureToRemove')}
							afterActionText={t('bankItem.accountRemoved')}
						/>
					</div>
					<FinancialValue value={account.value} currencyId={account.currencyId}/>
				</div>)}
			</Space>
			<Space size='small'>
				<ButtonAddItem
					size='small'
					text={t('bankItem.addAccount')}
					className={styles.addButton }
					addItemFormElement={<FormAddBankAccount bankId={bankId}/>}
				/>
			</Space>
		</Card>
	);
};

BankItem.propTypes = {
	bankId: PropTypes.string.isRequired,
};

export default BankItem;