import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAddBrokerAssetMutation } from '@root/api';
import { DEFAULT_ONE } from '@root/constants/default-values';
import { ASSET_TYPES } from '@root/enums/AssetTypesEnum';

import FormAddAsset from '../FormAddAsset/FormAddAsset';

export const FormAddCashAsset = ({ broker }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = ({ assetAmount, assetCurrency, assetName, purchasePricePerUnit }) => {
		addBrokerAsset({
			brokerId: broker._id,
			type: ASSET_TYPES.CASH,
			currency: assetCurrency,
			name: assetName,
			amount: assetAmount,
			purchasePricePerUnit: assetCurrency === assetName ? DEFAULT_ONE : purchasePricePerUnit
		});
	};

	return (
		<FormAddAsset
			brokerId={broker._id}
			assetType={ASSET_TYPES.CASH}
			addAssetCaption={t('brokerItem.addBrokerAssetCash')}
			submitHandler={submitHandler}
		/>
	);
};