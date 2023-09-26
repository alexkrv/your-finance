import React from 'react';
import PropTypes from 'prop-types';

import ButtonAddItem from '@root/components/ButtonAddItem/ButtonAddItem';
import { useEditBrokerAssetMutation, useRemoveBrokerAssetMutation, } from '@root/api';
import { ASSET_TYPES } from '@root/enums/AssetTypesEnum';

import styles from './InvestmentAssetWrapper.module.scss';

import InvestmentAsset from './InvestmentAsset/InvestmentAsset';

type InvestmentAssetWrapperProps = {
    brokerId: string,
    asset: {
        [key: string]: {
            amount: number,
            total: number,
            averageAssetPrice: number,
            currentAssetPrice: number,
            currency: string,
            type: string
        }
    },
    buttonAddAssetText: string,
    addAssetForm: React.ReactElement,
}

type AssetForEditType = {
    assetName: string,
    amount: number,
    purchasePricePerUnit: number,
    isBuyMode: boolean,
    currency: string
}

export const InvestmentAssetWrapper = ({
	brokerId,
	asset,
	buttonAddAssetText,
	addAssetForm,
}: InvestmentAssetWrapperProps) => {
	const [removeBrokerAsset] = useRemoveBrokerAssetMutation();
	const [editBrokerAsset] = useEditBrokerAssetMutation();
	const editAsset = ({ assetName, amount, purchasePricePerUnit, isBuyMode, currency }: AssetForEditType) =>
		editBrokerAsset({
			brokerId,
			name: assetName,
			type: asset[assetName].type,
			amount,
			purchasePricePerUnit,
			isBuyMode,
			currency,
		});
	const confirmAssetRemoving = (assetName: string) => removeBrokerAsset({ brokerId, name: assetName, type: asset[assetName].type });

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
					isCash={asset[assetKey].type === ASSET_TYPES.CASH}
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