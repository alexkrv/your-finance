import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAddBrokerAssetMutation } from '../../../../api';
import FormAddAsset from '../FormAddAsset/FormAddAsset';

const FormAddCashAsset = ({ brokerId }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = ({ assetAmount, assetCurrency }) => {
		addBrokerAsset({
			brokerId,
			type: 'cash',
			name: assetCurrency,
			amount: assetAmount,
		});
	};

	return (
		<FormAddAsset
			brokerId={brokerId}
			assetType='cash'
			addAssetCaption={t('brokerItem.addBrokerAssetCash')}
			submitHandler={submitHandler}
		/>
	);
};

FormAddCashAsset.propTypes = {

};

export default FormAddCashAsset;
