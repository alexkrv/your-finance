import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonAddItem from '@root/components/ButtonAddItem/ButtonAddItem';

import FormAddBroker from './FormAddBroker/FormAddBroker';
import BrokerItemsWrapper from './BrokerItemsWrapper/BrokerItemsWrapper';

const PageInvestment = () => {
	const { t } = useTranslation();

	return (
		<div>
			<ButtonAddItem
				size='medium'
				text={t('brokerItem.addBroker')}
				addItemFormElement={<FormAddBroker/>}
			/>
			<BrokerItemsWrapper/>
		</div>
	);
};

PageInvestment.propTypes = {

};

export default PageInvestment;