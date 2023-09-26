import React from 'react';
import { Space, } from 'antd';
import { useTranslation } from 'react-i18next';

import ButtonAddItem from '@root/components/ButtonAddItem/ButtonAddItem';

import styles from './PageCashStructure.module.scss';

import FormAddBankOrganization from './FormAddBankOrganization/FormAddBankOrganization';
import { BankItemsWrapper } from './BankItemsWrapper/BankItemsWrapper';

const PageCashStructure = () => {
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<Space align='start' direction='vertical'>
				<BankItemsWrapper/>
				<ButtonAddItem
					size='large'
					text={t('bankItem.addBank')}
					addItemFormElement={<FormAddBankOrganization/>}
				/>
			</Space>
		</div>
	);
};

export default PageCashStructure;