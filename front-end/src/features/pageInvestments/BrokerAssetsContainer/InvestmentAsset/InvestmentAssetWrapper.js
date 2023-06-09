import { TYPE_ASSET_CASH } from 'constants/broker-asset-types';

import React from 'react';
import PropTypes from 'prop-types';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';

import { useEditBrokerAssetMutation, useRemoveBrokerAssetMutation, } from '../../../../api';

import styles from './InvestmentAssetWrapper.module.scss';

import InvestmentAsset from './InvestmentAsset/InvestmentAsset';

const InvestmentAssetWrapper = ({
	brokerId,
	asset,
	buttonAddAssetText,
	addAssetForm,
}) => {
	const [removeBrokerAsset] = useRemoveBrokerAssetMutation();
	const [editBrokerAsset] = useEditBrokerAssetMutation();
	const editAsset = ({ assetName, amount, purchasePricePerUnit, isBuyMode, currency }) =>
		editBrokerAsset({
			brokerId,
			name: assetName,
			type: asset[assetName].type,
			amount,
			purchasePricePerUnit,
			isBuyMode,
			currency,
		});
	const confirmAssetRemoving = assetName => removeBrokerAsset({ brokerId, name: assetName, type: asset[assetName].type });

	return (
		<div className={styles.container}>
			{Object.keys(asset).map( assetKey =>
				<InvestmentAsset
					key={assetKey}
					assetName={assetKey}
					currencyId={asset[assetKey].currency}
					assetAmount={asset[assetKey].amount}
					averagePrice={asset[assetKey].averageAssetPrice}
					editAsset={editAsset}
					confirmAssetRemoving={() => confirmAssetRemoving(assetKey)}
					isCash={asset[assetKey].type === TYPE_ASSET_CASH}
				/>
			)}
			<ButtonAddItem
				size='medium'
				text={buttonAddAssetText}
				addItemFormElement={addAssetForm}
				className={styles.buttonAddItem}
			/>
		</div>
	);
};

InvestmentAssetWrapper.propTypes = {
	brokerId: PropTypes.string.isRequired,
	asset: PropTypes.shape({
		amount: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		averageAssetPrice: PropTypes.number.isRequired,
		currentAssetPrice: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	}).isRequired,
	buttonAddAssetText: PropTypes.string.isRequired,
	addAssetForm: PropTypes.node.isRequired,
};

export default InvestmentAssetWrapper;
