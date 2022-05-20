import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import { Card } from 'components/Card/Card';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';

import FormAddBankAccount from '../FormAddBankAccount/FormAddBankAccount';
import { useDeleteBankAccountMutation, useDeleteBankOrganizationMutation, useGetConversionRatesQuery } from '../../../api';
import { DEFAULT_ZERO } from '../../../constants/default-values';
import AvatarWithUpload from '../../../components/AvatarWithUpload/AvatarWithUpload';

import styles from './BankItem.module.scss';

const BankItem = ({ bank, }) => {
	const { t } = useTranslation();
	const [deleteBankOrganization] = useDeleteBankOrganizationMutation();
	const [deleteBankAccount] = useDeleteBankAccountMutation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const confirmBankAccountRemoving = accountId => deleteBankAccount({ bankId: bank._id, accountId });
	const confirmBankRemoving = () => deleteBankOrganization(bank._id);
	const { data, error, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const total = isFetching || error ?
		DEFAULT_ZERO
		: parseFloat(bank.accounts.reduce((acc, el) => acc + el.value/(data.rates[el.currencyId].value || 1), DEFAULT_ZERO)
			.toFixed(1));

	return (
		<Card className={styles.card}>
			<Space size='small' direction='horizontal' className={styles.header}>
				<AvatarWithUpload
					actionUrl={ `/bank-organization/avatar?bankId=${bank._id}` }
					avatarImg={''/*TODO use back-end response*/}
				/>
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
						&nbsp;{ isFetching ? <Spin size='small' />: <FinancialValue value={total} currencyId={baseCurrencyKey}/> }
					</div>
				</div>
			</Space>
			<Space size='middle' direction='horizontal' wrap>
				{bank.accounts.map( account => <div key={account._id} className={styles.metaContainer}>
					<div className={styles.nameContainer}>
						<div className={styles.accountName}>
							{account.name}
						</div>
						<ButtonDeleteItem
							confirmationPlacement="right"
							confirmationCancelText={t('common.keep')}
							confirmationOkText={t('common.remove')}
							onConfirm={() => confirmBankAccountRemoving(account._id)}
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