import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InvestmentAsset from '../InvestmentAsset/InvestmentAsset';
import { TYPE_ASSET_FUNDS } from '../../../../constants/broker-asset-types';

import FormAddFundAsset from './FormAddFundAsset';

const FundAssets = ({ broker }) => {
	const { t } = useTranslation();

	return (
		<InvestmentAsset
			brokerId={broker._id}
			asset={broker.assets[TYPE_ASSET_FUNDS]}
			buttonAddAssetText={t('brokerItem.addBrokerAssetFund')}
			addAssetForm={<FormAddFundAsset broker={broker}/>}
		/>
	);
};

FundAssets.propTypes = {

};

export default FundAssets;
