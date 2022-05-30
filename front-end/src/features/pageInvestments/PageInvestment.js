import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonAddItem from '../../components/ButtonAddItem/ButtonAddItem';
import styles from '../pageCashStructure/BankItem/BankItem.module.scss';

import FormAddBroker from './FormAddBroker/FormAddBroker';
import BrokerItemsWrapper from './BrokerItemsWrapper/BrokerItemsWrapper';

const PageInvestment = () => {
	const { t } = useTranslation();

	return (
		<div>
			<ButtonAddItem
				size='medium'
				text={t('brokerItem.addBroker')}
				className={styles.addButton }
				addItemFormElement={<FormAddBroker/>}
			/>
			<BrokerItemsWrapper/>
		</div>
	);
};

PageInvestment.propTypes = {

};

export default PageInvestment;