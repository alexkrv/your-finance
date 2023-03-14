import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ButtonEdit from 'components/ButtonEdit/ButtonEdit';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import { useDeleteBankAccountMutation } from 'api';

import EditAccountForm from '../EditAccountForm/EditAccountForm';

import styles from './AccountItem.module.scss';

const AccountItem = ({ bankId, account }) => {
	const { t } = useTranslation();
	const [deleteBankAccount] = useDeleteBankAccountMutation();
	const confirmBankAccountRemoving = accountId => deleteBankAccount({ bankId, accountId });

	return (
		<div className={styles.container}>
			<div className={styles.nameContainer}>
				<div className={styles.accountName}>
					{account.name}
				</div>
				<ButtonEdit
					title={t('bankItem.editAccount')}
					afterActionText={t('common.done')}
					editItemFormElement={<EditAccountForm
						bankId={bankId}
						account={account}
					/>}
				/>
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
		</div>
	);
};

AccountItem.propTypes = {
	bankId: PropTypes.string.isRequired,
	account: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		currencyId: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
	}).isRequired
};

export default AccountItem;