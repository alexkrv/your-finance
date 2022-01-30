import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Modal, Space, } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './BankItem.module.scss';

import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import { Card } from 'components/Card/Card';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import FormAddBankAccount from '../FormAddBankAccount/FormAddBankAccount';
import { removeBankAccount, removeBank, } from '../PageCashCategoriesSlice';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';

const BankItem = ({ bankId, }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { bankItems } = useSelector(state => state.cashCategories);
	const showModal = () => setIsModalVisible(true);
	const handleOk = () => setIsModalVisible(false);
	const handleCancel = () => setIsModalVisible(false);
	const confirmBankAccountRemoving = (accountId) => dispatch(removeBankAccount({ bankId, accountId }));
	const confirmBankRemoving = () => dispatch(removeBank(bankId));

	return (
		<Card className={styles.card}>
			<Space size='small' direction='horizontal' className={styles.header}>
				<Avatar size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 }}/>
				<div className={styles.metaContainer}>
					<div className={styles.bankName}>
						{bankItems[bankId]?.name || t('common.unknown')}
						<ButtonDeleteItem
							confirmationPlacement="right"
							confirmationCancelText={t('cashCategories.keep')}
							confirmationOkText={t('cashCategories.remove')}
							onConfirm={confirmBankRemoving}
							title={t('cashCategories.sureToRemove')}
							iconClassName={styles.deleteBank}
						/>
					</div>
					<div className={styles.bankTotalValue}>
						{t('cashCategories.netBalance')}
						&nbsp;<FinancialValue value={123123} currencyId={baseCurrencyKey}/>
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
							confirmationCancelText={t('cashCategories.keep')}
							confirmationOkText={t('cashCategories.remove')}
							onConfirm={() => confirmBankAccountRemoving(account.id)}
							title={t('cashCategories.sureToRemove')}
						/>
					</div>
					<FinancialValue value={account.value} currencyId={account.currencyId}/>
				</div>)}
			</Space>
			<Space size='small'>
				<ButtonAddItem onClick={showModal} size='small' text={t('cashCategories.addAccount')} className={styles.addButton }/>
			</Space>
			<Modal width={'fit-content'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false}>
				<FormAddBankAccount/>
			</Modal>
		</Card>
	);
};

BankItem.propTypes = {
	bankId: PropTypes.string.isRequired,
};

export default BankItem;