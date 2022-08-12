import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InvestmentAsset from '../InvestmentAsset/InvestmentAsset';

import FormAddStockAsset from './FormAddStockAsset';

const StockAssets = ({ broker }) => {
	const { t } = useTranslation();

	return (
		<InvestmentAsset
			brokerId={broker._id}
			asset={broker.assets['stocks']}
			buttonAddAssetText={t('brokerItem.addBrokerStockAsset')}
			addAssetForm={<FormAddStockAsset broker={broker}/>}
		/>
	);
};

StockAssets.propTypes = {

};

export default StockAssets;
