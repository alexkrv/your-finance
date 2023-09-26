import React from 'react';
import { Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import ButtonAddItem from '@root/components/ButtonAddItem/ButtonAddItem';
import { Card } from '@root/components/Card/Card';
import { FinancialValue } from '@root/components/FinancialValue/FinancialValue';
import ButtonDeleteItem from '@root/components/ButtonDeleteItem/ButtonDeleteItem';
import { useDeleteBankOrganizationMutation, } from '@root/api';
import UploadButton from '@root/components/UploadButton/UploadButton';
import { useGetTotalInBaseCurrency } from '@root/utils/custom-react-hooks';
import type { BankItemType } from '@root/types';
import { useAppSelector } from '@root/hooks/hooks';

import FormAddBankAccount from '../FormAddBankAccount/FormAddBankAccount';

import styles from './BankItem.module.scss';

import { AccountItem } from './AccountItem/AccountItem';

export const BankItem = ({ bank }: { bank: BankItemType }) => {
	const { t } = useTranslation();
	const [deleteBankOrganization] = useDeleteBankOrganizationMutation();
	const { baseCurrencyKey } = useAppSelector(state => state.currencies);
	const confirmBankRemoving = () => deleteBankOrganization(bank._id);
	const getValue = ({ value, currencyId: currency }: {value: number, currencyId: string}) => ({ value, currency });
	const { total, isFetching } = useGetTotalInBaseCurrency(bank.accounts.map(getValue));

	return (
		<Card className={styles.card}>
			<Space size='small' direction='horizontal' className={styles.header}>
				<UploadButton
					actionUrl={ `/bank-organization/avatar?bankId=${bank._id}` }
					avatar={bank.avatar}
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
						{t('common.total')}
						&nbsp;{ isFetching
							? <Spin size='small' />
							: <FinancialValue value={total} currencyId={baseCurrencyKey}/> }
					</div>
				</div>
			</Space>
			<Space size='middle' direction='horizontal' wrap>
				{bank.accounts.map( account => (
					<AccountItem
						key={account._id}
						account={account}
						bankId={bank._id}
					/>
				))}
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