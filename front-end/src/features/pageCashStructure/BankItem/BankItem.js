import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Space, } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import { Card } from 'components/Card/Card';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';

import FormAddBankAccount from '../FormAddBankAccount/FormAddBankAccount';
import { removeBankAccount, removeBankOrganization, } from '../PageCashStructureSlice';

import styles from './BankItem.module.scss';

const BankItem = ({ bank, }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const confirmBankAccountRemoving = (accountId) => dispatch(removeBankAccount({ bankId: bank._id, accountId }));
	const confirmBankRemoving = () => dispatch(removeBankOrganization(bank._id));

	return (
		<Card className={styles.card}>
			<Space size='small' direction='horizontal' className={styles.header}>
				<Avatar size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 }}/>
				<div className={styles.metaContainer}>
					<div className={styles.bankName}>
						{bank.name || t('common.unknown')}
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
				{bank.accounts.map( account => <div key={account.id} className={styles.metaContainer}>
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
					addItemFormElement={<FormAddBankAccount bankId={bank._id}/>}
				/>
			</Space>
		</Card>
	);
};

BankItem.propTypes = {
	bank: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		accounts: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			currencyId: PropTypes.string.isRequired,
			value: PropTypes.number.isRequired,
			_id: PropTypes.string.isRequired
		})),
	}),
};

export default BankItem;