import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Modal, Popconfirm, Space, } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styles from './BankItem.module.scss';

import ButtonAddItem from '../../../components/ButtonAddItem/ButtonAddItem';
import { Card } from 'components/Card/Card';
import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';
import FormAddBankAccount from '../FormAddBankAccount/FormAddBankAccount';

const BankItem = ({ bankName, accounts }) => {
	const { t } = useTranslation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const showModal = () => setIsModalVisible(true);
	const handleOk = () => setIsModalVisible(false);
	const handleCancel = () => setIsModalVisible(false);
	const confirm = () => {/*TODO*/};

	return (
		<Card className={styles.card}>
			<Space size='small' direction='horizontal' className={styles.header}>
				<Avatar
					size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 }}
				/>
				<div className={styles.metaContainer}>
					<div className={styles.bankName}>{bankName}</div>
					<div className={styles.bankTotalValue}>
						{t('cashCategories.netBalance')}
						&nbsp;<FinancialValue value={123123} currencyId={baseCurrencyKey}/>
					</div>
				</div>
			</Space>
			<Space size='middle' direction='horizontal' wrap>
				{accounts.map( account => <div key={account.id} className={styles.metaContainer}>
					<div className={styles.nameContainer}>
						<div className={styles.accountName}>
							{account.name}
						</div>
						<Popconfirm
							placement="right"
							title={t('cashCategories.sureToRemove')}
							onConfirm={confirm}
							okText={t('cashCategories.remove')}
							cancelText={t('cashCategories.keep')}
						>
							<DeleteOutlined className={styles.deleteIcon} />
						</Popconfirm>
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
	bankName: PropTypes.string.isRequired,
	accounts: PropTypes.arrayOf(PropTypes.shape({
		accountName: PropTypes.string,
		accountCurrencyId: PropTypes.string,
		accountValue: PropTypes.number,
	})).isRequired,
};

export default BankItem;