import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAddBrokerAssetMutation } from 'api';

import FormAddAsset from '../FormAddAsset/FormAddAsset';

const FormAddStockAsset = ({ broker }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = data => {
		addBrokerAsset({
			brokerId: broker._id,
			type: 'stocks', // TODO move to constants
			name: data.assetName,
			amount: data.assetAmount,
			currency: data.assetCurrency,
			purchasePricePerUnit: data.purchasePricePerUnit,
		});
	};

	return (
		<FormAddAsset
			brokerId={broker._id}
			assetType='stocks'
			addAssetCaption={t('brokerItem.addBrokerStockAsset')}
			submitHandler={submitHandler}
		/>
	);
};

FormAddStockAsset.propTypes = {

};

export default FormAddStockAsset;
