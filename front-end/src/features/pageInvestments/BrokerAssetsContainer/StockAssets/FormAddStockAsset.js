import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAddBrokerAssetMutation } from 'api';

import FormAddAsset from '../FormAddAsset/FormAddAsset';
import { TYPE_ASSET_STOCKS } from '../../../../constants/broker-asset-types';

const FormAddStockAsset = ({ broker }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = data => {
		addBrokerAsset({
			brokerId: broker._id,
			type: TYPE_ASSET_STOCKS,
			name: data.assetName,
			amount: data.assetAmount,
			currency: data.assetCurrency,
			purchasePricePerUnit: data.purchasePricePerUnit,
		});
	};

	return (
		<FormAddAsset
			brokerId={broker._id}
			assetType={TYPE_ASSET_STOCKS}
			addAssetCaption={t('brokerItem.addBrokerStockAsset')}
			submitHandler={submitHandler}
		/>
	);
};

FormAddStockAsset.propTypes = {

};

export default FormAddStockAsset;
