import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetConversionRatesQuery, } from 'api/';

import { FinancialValue } from '../../../../components/FinancialValue/FinancialValue';
import ButtonDeleteItem from '../../../../components/ButtonDeleteItem/ButtonDeleteItem';
import ButtonAddItem from '../../../../components/ButtonAddItem/ButtonAddItem';
import { DEFAULT_ONE, DEFAULT_ZERO } from '../../../../constants/default-values';
import { useEditBrokerAssetMutation, useRemoveBrokerAssetMutation } from '../../../../api';
import ButtonEdit from '../../../../components/ButtonEdit/ButtonEdit';

import styles from './InvestmentAsset.module.scss';

import EditItemForm from './EditItemForm/EditItemForm';

const InvestmentAsset = ({
	broker,
	assetType,
	buttonAddAssetText,
	addAssetForm,
}) => {
	const asset = broker.assets?.[assetType];
	const [removeBrokerAsset] = useRemoveBrokerAssetMutation();
	const { t, } = useTranslation();
	const [processedAsset, setProcessAsset] = useState({});
	const { baseCurrencyKey } = useSelector(state => state.currencies); // TODO unite in custom hook
	const { data, error, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey); // TODO unite in custom hook
	const [editBrokerAsset] = useEditBrokerAssetMutation();

	const editAsset = ({ assetName, amount, purchasePricePerUnit, isBuyMode, currency }) =>
		editBrokerAsset({
			brokerId: broker._id,
			name: assetName,
			type: assetType,
			amount,
			purchasePricePerUnit,
			isBuyMode,
			currency,
		});
	const confirmAssetRemoving = assetName => removeBrokerAsset({ brokerId: broker._id, name: assetName, type: assetType });
	const confirm = assetToDelete => {
		/*TODO add logic here 	assetToDelete*/
		confirmAssetRemoving(assetToDelete);
	};
	const processAsset = (investmentAsset, rates) => {
		const assetItemNames = investmentAsset ? Object.keys(investmentAsset) : [];

		return assetItemNames.reduce((acc, itemName) => {
			const totalAmountOfItems = investmentAsset[itemName].reduce((amountOfItems, item) => amountOfItems + item.amount, DEFAULT_ZERO);
			const averageAssetPrice = investmentAsset[itemName].reduce((totalSum, item) =>
				totalSum + item.amount*item.purchasePricePerUnit/(rates[item.purchaseCurrency].value || DEFAULT_ONE)
			, DEFAULT_ZERO)/totalAmountOfItems;
			const processedCurrentAssetPrice = investmentAsset[itemName][DEFAULT_ZERO].currentAssetPrice
                /(rates[investmentAsset[itemName][DEFAULT_ZERO].purchaseCurrency].value || DEFAULT_ONE);

			return {
				...acc,
				[itemName]: {
					amount: totalAmountOfItems,
					total: (totalAmountOfItems*investmentAsset[itemName][DEFAULT_ZERO].currentAssetPrice).toFixed(1),
					averageAssetPrice: averageAssetPrice.toFixed(1),
					currentAssetPrice: processedCurrentAssetPrice,
					currency: baseCurrencyKey
				}
			};}, {});
	};

	useEffect(() => {
		if(data?.rates) {
			setProcessAsset(processAsset(asset, data.rates));
		}
	}, [asset, data?.rates]);

	return (
		<div className={styles.container}>
			{Object.keys(processedAsset).map( assetKey => <div key={assetKey} className={styles.asset}>
				<div className={styles.infoBlock}>
					<div className={styles.assetName}>
						{assetKey}
					</div>
					<ButtonEdit
						onConfirm={() => {/*TODO create handler*/}}
						title={t('brokerItem.editInvestItem')}
						afterActionText={t('common.done')}
						editItemFormElement={
							<EditItemForm
								assetName={assetKey}
								submitHandler={editAsset}
							/>
						}
					/>
					<ButtonDeleteItem
						confirmationPlacement="right"
						confirmationOkText={t('common.remove')}
						confirmationCancelText={t('common.keep')}
						afterActionText={`${assetKey} ${t('common.removed')}`}
						onConfirm={() => confirm(assetKey)/*TODO useCallback?*/}
						title={t('common.sureToRemove')}
						iconClassName={styles.deleteIcon}
					/>
					<FinancialValue value={processedAsset[assetKey].amount} />
				</div>
				<div className={styles.infoBlock}>
					{t('common.total')}
					<FinancialValue
						currencyId={processedAsset[assetKey].currency}
						value={(processedAsset[assetKey].amount * processedAsset[assetKey].averageAssetPrice).toFixed(DEFAULT_ONE)/*TODO use current asset price*/}
					/>
				</div>
				<div className={styles.infoBlock}>
					{t('brokerItem.averageAssetPrice')}
					<FinancialValue
						currencyId={processedAsset[assetKey].currency}
						value={processedAsset[assetKey].averageAssetPrice}
					/>
				</div>
			</div>)}
			<ButtonAddItem
				size='medium'
				text={buttonAddAssetText}
				addItemFormElement={addAssetForm}
				className={styles.buttonAddItem}
			/>
		</div>
	);
};

InvestmentAsset.propTypes = {
	broker: PropTypes.object.isRequired,
	assetType: PropTypes.string.isRequired,
	buttonAddAssetText: PropTypes.string.isRequired,
	addAssetForm: PropTypes.node.isRequired,
};

export default InvestmentAsset;
