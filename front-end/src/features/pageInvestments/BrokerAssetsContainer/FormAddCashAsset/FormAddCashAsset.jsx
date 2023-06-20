import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAddBrokerAssetMutation } from '@root/api';
import FormAddAsset from '../FormAddAsset/FormAddAsset';
import { DEFAULT_ONE } from '@root/constants/default-values';
import { TYPE_ASSET_CASH } from '@root/constants/broker-asset-types';

const FormAddCashAsset = ({ broker }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = ({ assetAmount, assetCurrency, assetName, purchasePricePerUnit }) => {
		addBrokerAsset({
			brokerId: broker._id,
			type: TYPE_ASSET_CASH,
			currency: assetCurrency,
			name: assetName,
			amount: assetAmount,
			purchasePricePerUnit: assetCurrency === assetName ? DEFAULT_ONE : purchasePricePerUnit
		});
	};

	return (
		<FormAddAsset
			brokerId={broker._id}
			assetType={TYPE_ASSET_CASH}
			addAssetCaption={t('brokerItem.addBrokerAssetCash')}
			submitHandler={submitHandler}
		/>
	);
};

FormAddCashAsset.propTypes = {

};

export default FormAddCashAsset;
