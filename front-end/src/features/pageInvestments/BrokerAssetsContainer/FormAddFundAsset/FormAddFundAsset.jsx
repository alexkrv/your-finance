import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAddBrokerAssetMutation } from '@root/api';
import FormAddAsset from '../FormAddAsset/FormAddAsset';
import { TYPE_ASSET_FUNDS } from '@root/constants/broker-asset-types';

const FormAddFundAsset = ({ broker }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = data => {
		addBrokerAsset({
			brokerId: broker._id,
			type: TYPE_ASSET_FUNDS,
			name: data.assetName,
			amount: data.assetAmount,
			currency: data.assetCurrency,
			purchasePricePerUnit: data.purchasePricePerUnit,
		});
	};

	return (
		<FormAddAsset
			brokerId={broker._id}
			assetType={TYPE_ASSET_FUNDS}
			addAssetCaption={t('brokerItem.addBrokerAssetFund')}
			submitHandler={submitHandler}
		/>
	);
};

FormAddFundAsset.propTypes = {

};

export default FormAddFundAsset;
