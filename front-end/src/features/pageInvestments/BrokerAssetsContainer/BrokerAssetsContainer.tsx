import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import { DEFAULT_ONE, DEFAULT_ZERO } from '@root/constants/default-values';
import { useCommonErrorMessage, useGetConversionRatesInBaseCurrency } from '@root/utils/custom-react-hooks';
import type { AssetType, BrokerType, CurrencyConversionRate, AssetItemType} from '@root/types';
import { ASSET_TYPES } from '@root/enums/AssetTypesEnum';

import styles from './BrokerAssetsContainer.module.scss';

import AssetName from './InvestmentAsset/AssetName/AssetName';
import { FormAddCashAsset } from './FormAddCashAsset/FormAddCashAsset';
import { InvestmentAssetWrapper } from './InvestmentAsset/InvestmentAssetWrapper';
import { FormAddStockAsset } from './FormAddStockAsset/FormAddStockAsset';
import { FormAddFundAsset } from './FormAddFundAsset/FormAddFundAsset';

type ProcessedAssetType = {[key: string]: {
	amount: number,
	total: number,
	averageAssetPrice: number,
	currentAssetPrice: number,
	currency: string,
	type: string
}}

export const BrokerAssetsContainer = ({ broker }: {broker: BrokerType}) => {
	const { t } = useTranslation();
	const onChange = () => {/*TODO*/};
	const { data, error, isFetching, baseCurrencyKey } = useGetConversionRatesInBaseCurrency();
	const processAsset = useCallback((
		investmentAsset: {[key: string]: AssetItemType[]}, // TODO figure out correct typing
		rates: CurrencyConversionRate,
		currencyId: string,
		assetType: ASSET_TYPES
	): ProcessedAssetType => {
		const assetItemNames = investmentAsset ? Object.keys(investmentAsset) : [];

		return assetItemNames.reduce((acc, itemName: string) => {
			const asset: AssetItemType[] = investmentAsset[itemName]
			const totalAmountOfItems = asset.reduce((amountOfItems: number, item: AssetItemType) => amountOfItems + item.amount, DEFAULT_ZERO);
			const averageAssetPrice = asset.reduce((totalSum: number, item: AssetItemType) =>
				totalSum + item.amount*item.purchasePricePerUnit/(rates[item.purchaseCurrency].value || DEFAULT_ONE)
			, DEFAULT_ZERO)/totalAmountOfItems;
			const processedCurrentAssetPrice = asset[DEFAULT_ZERO].currentAssetPrice
				/(rates[asset[DEFAULT_ZERO].purchaseCurrency].value || DEFAULT_ONE);

			return {
				...acc,
				[itemName]: {
					amount: totalAmountOfItems,
					total: parseFloat((totalAmountOfItems*asset[DEFAULT_ZERO].currentAssetPrice).toFixed(1)),
					averageAssetPrice: parseFloat(averageAssetPrice.toFixed(1)),
					currentAssetPrice: processedCurrentAssetPrice,
					currency: currencyId,
					type: assetType
				}
			};}, {});
	}, []);
	const { processedStocks, processedFunds, processedCash } = useMemo((): {
		processedStocks: ProcessedAssetType,
		processedFunds: ProcessedAssetType,
		processedCash: ProcessedAssetType,
	} => {
		if(!data || error) {
			return {
				processedStocks: {},
				processedFunds: {},
				processedCash: {}
			};
		}

		const stocks = broker.assets?.[ASSET_TYPES.STOCKS];
		const funds = broker.assets?.[ASSET_TYPES.FUNDS];
		const cash = broker.assets?.[ASSET_TYPES.CASH];

		return {
			processedStocks: processAsset(stocks, data.rates, baseCurrencyKey, ASSET_TYPES.STOCKS),
			processedFunds: processAsset(funds, data.rates, baseCurrencyKey, ASSET_TYPES.FUNDS),
			processedCash: processAsset(cash, data.rates, baseCurrencyKey, ASSET_TYPES.CASH),
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
						key={ASSET_TYPES.CASH}
						header={<AssetName assetName={t('brokerItem.cash')}/>}
						className={styles.collapsePanel}
					>
						<InvestmentAssetWrapper
							brokerId={broker._id}
							asset={processedCash}
							buttonAddAssetText={t('brokerItem.addBrokerAssetCash')}
							addAssetForm={<FormAddCashAsset broker={broker}/>}
						/>
					</Collapse.Panel>
					<Collapse.Panel
						key={ASSET_TYPES.STOCKS}
						header={<AssetName assetName={t('brokerItem.stocksCaption')}/>}
						className={styles.collapsePanel}
					>
						<InvestmentAssetWrapper
							brokerId={broker._id}
							asset={processedStocks}
							buttonAddAssetText={t('brokerItem.addBrokerStockAsset')}
							addAssetForm={<FormAddStockAsset broker={broker}/>}
						/>
					</Collapse.Panel>
					<Collapse.Panel
						key={ASSET_TYPES.FUNDS}
						header={<AssetName assetName={t('brokerItem.fundsCaption')}/>}
						className={styles.collapsePanel}
					>
						<InvestmentAssetWrapper
							brokerId={broker._id}
							asset={processedFunds}
							buttonAddAssetText={t('brokerItem.addBrokerAssetFund')}
							addAssetForm={<FormAddFundAsset broker={broker}/>}
						/>
					</Collapse.Panel>
				</Collapse>}
		</div>
	);
};