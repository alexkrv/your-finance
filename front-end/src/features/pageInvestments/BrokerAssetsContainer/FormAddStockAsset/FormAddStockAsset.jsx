import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAddBrokerAssetMutation } from '@root/api';
import { ASSET_TYPES } from '@root/enums/AssetTypesEnum';

import FormAddAsset from '../FormAddAsset/FormAddAsset';

export const FormAddStockAsset = ({ broker }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = data => {
		addBrokerAsset({
			brokerId: broker._id,
			type: ASSET_TYPES.STOCKS,
			name: data.assetName,
			amount: data.assetAmount,
			currency: data.assetCurrency,
			purchasePricePerUnit: data.purchasePricePerUnit,
		});
	};

	return (
		<FormAddAsset
			brokerId={broker._id}
			assetType={ASSET_TYPES.STOCKS}
			addAssetCaption={t('brokerItem.addBrokerStockAsset')}
			submitHandler={submitHandler}
		/>
	);
};