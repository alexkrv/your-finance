import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAddBrokerAssetMutation } from '../../../../api';
import FormAddAsset from '../FormAddAsset/FormAddAsset';
import { DEFAULT_ONE } from '../../../../constants/default-values';

const FormAddCashAsset = ({ brokerId }) => {
	const { t } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const submitHandler = ({ assetAmount, assetCurrency, assetName, purchasePricePerUnit }) => {
		addBrokerAsset({
			brokerId,
			type: 'cash',
			currency: assetCurrency,
			name: assetName,
			amount: assetAmount,
			purchasePricePerUnit: assetCurrency === assetName ? DEFAULT_ONE : purchasePricePerUnit
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
