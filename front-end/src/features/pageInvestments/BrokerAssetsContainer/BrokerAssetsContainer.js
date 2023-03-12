import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import { TYPE_ASSET_CASH, TYPE_ASSET_FUNDS, TYPE_ASSET_STOCKS } from '../../../constants/broker-asset-types';
import { DEFAULT_ONE, DEFAULT_ZERO } from '../../../constants/default-values';
import { useCommonErrorMessage, useGetConversionRatesInBaseCurrency } from '../../../utils/custom-react-hooks';

import styles from './BrokerAssetsContainer.module.scss';

import AssetName from './InvestmentAsset/AssetName/AssetName';
import FormAddCashAsset from './FormAddCashAsset/FormAddCashAsset';
import InvestmentAssetWrapper from './InvestmentAsset/InvestmentAssetWrapper';
import FormAddStockAsset from './FormAddStockAsset/FormAddStockAsset';
import FormAddFundAsset from './FormAddFundAsset/FormAddFundAsset';

const BrokerAssetsContainer = ({ broker }) => {
	const { t } = useTranslation();
	const onChange = () => {/*TODO*/};
	const { data, error, isFetching, baseCurrencyKey } = useGetConversionRatesInBaseCurrency();

	const processAsset = useCallback((investmentAsset, rates, currencyId, assetType) => {
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
					total: parseFloat((totalAmountOfItems*investmentAsset[itemName][DEFAULT_ZERO].currentAssetPrice).toFixed(1)),
					averageAssetPrice: parseFloat(averageAssetPrice.toFixed(1)),
					currentAssetPrice: processedCurrentAssetPrice,
					currency: currencyId,
					type: assetType
				}
			};}, {});
	}, []);
	const { processedStocks, processedFunds, processedCash, brokerId } = useMemo(() => {
		if(!data || error) {
			return {};
		}

		const stocks = broker.assets?.[TYPE_ASSET_STOCKS];
		const funds = broker.assets?.[TYPE_ASSET_FUNDS];
		const cash = broker.assets?.[TYPE_ASSET_CASH];

		return {
			brokerId: broker._id,
			processedStocks: processAsset(stocks, data.rates, baseCurrencyKey, TYPE_ASSET_STOCKS),
			processedFunds: processAsset(funds, data.rates, baseCurrencyKey, TYPE_ASSET_FUNDS),
			processedCash: processAsset(cash, data.rates, baseCurrencyKey, TYPE_ASSET_CASH),
		};
	}, [processAsset, broker, data, error, baseCurrencyKey]);

	useCommonErrorMessage({ error });

	return (
		<div>
			{isFetching ? null :
				<Collapse
					ghost
					onChange={onChange}
					expandIcon={({ isActive }) => <div className={styles.iconContainer}>
						<CaretRightOutlined rotate={isActive ? 90 : 0} className={styles.caret}/>
					</div>}
					className={styles.collapseContainer}
				>
					<Collapse.Panel
						key={TYPE_ASSET_CASH}
						header={<AssetName assetName={t('brokerItem.cash')}/>}
						className={styles.collapsePanel}
					>
						<InvestmentAssetWrapper
							brokerId={brokerId}
							asset={processedCash}
							buttonAddAssetText={t('brokerItem.addBrokerAssetCash')}
							addAssetForm={<FormAddCashAsset broker={broker}/>}
						/>
					</Collapse.Panel>
					<Collapse.Panel
						key={TYPE_ASSET_STOCKS}
						header={<AssetName assetName={t('brokerItem.stocksCaption')}/>}
						className={styles.collapsePanel}
					>
						<InvestmentAssetWrapper
							brokerId={brokerId}
							asset={processedStocks}
							buttonAddAssetText={t('brokerItem.addBrokerStockAsset')}
							addAssetForm={<FormAddStockAsset broker={broker}/>}
						/>
					</Collapse.Panel>
					<Collapse.Panel
						key={TYPE_ASSET_FUNDS}
						header={<AssetName assetName={t('brokerItem.fundsCaption')}/>}
						className={styles.collapsePanel}
					>
						<InvestmentAssetWrapper
							brokerId={brokerId}
							asset={processedFunds}
							buttonAddAssetText={t('brokerItem.addBrokerAssetFund')}
							addAssetForm={<FormAddFundAsset broker={broker}/>}
						/>
					</Collapse.Panel>
				</Collapse>}
		</div>
	);
};

BrokerAssetsContainer.propTypes = {
	broker: PropTypes.object.isRequired// TODO shape
};

export default BrokerAssetsContainer;
