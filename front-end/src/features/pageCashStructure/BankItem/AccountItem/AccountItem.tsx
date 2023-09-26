import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonEdit from '@root/components/ButtonEdit/ButtonEdit';
import ButtonDeleteItem from '@root/components/ButtonDeleteItem/ButtonDeleteItem';
import { FinancialValue } from '@root/components/FinancialValue/FinancialValue';
import { useDeleteBankAccountMutation } from '@root/api';
import type { AccountItemType } from '@root/types';

import { EditAccountForm } from '../EditAccountForm/EditAccountForm';

import styles from './AccountItem.module.scss';

export const AccountItem = ({ bankId, account }: AccountItemType) => {
	const { t } = useTranslation();
	const [deleteBankAccount] = useDeleteBankAccountMutation();
	const confirmBankAccountRemoving = (accountId: string) => deleteBankAccount({ bankId, accountId });

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