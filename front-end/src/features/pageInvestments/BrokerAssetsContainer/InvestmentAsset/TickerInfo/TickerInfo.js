import { DEFAULT_ONE } from 'constants/default-values';

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import TextStyler from 'components/TextStyler/TextStyler';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import { useGetBrokerAssetPriceQuery } from 'api';

import styles from './TickerInfo.module.scss';

const TickerInfo = ({ ticker, amount, averagePrice, }) => {
	const { t } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetBrokerAssetPriceQuery({ baseCurrencyKey, ticker });

	return (
		<div className={styles.container}>
			<TextStyler size='medium'  className={styles.total} secondary>
				{t('common.total')}
			</TextStyler>
			<TextStyler size='medium'  className={styles.unitPrice} secondary>
				{t('brokerItem.pricePerUnit')}
			</TextStyler>
			<TextStyler size='medium'  className={styles.average} secondary>
				{t('brokerItem.averageAssetPrice')}
			</TextStyler>
			{isFetching
				? <Spin size='small' />
				: <>
					<FinancialValue
						currencyId={baseCurrencyKey}
						value={data?.currentPrice.toFixed(2)}
						className={styles.unitPriceValue}
					/>
					<FinancialValue
						currencyId={baseCurrencyKey}
						value={(data.currentPrice * amount).toFixed(DEFAULT_ONE)}
						className={styles.totalValue}
					/>
					<FinancialValue
						currencyId={baseCurrencyKey}
						value={averagePrice}
						className={styles.averageValue}
					/>
				</>}
		</div>
	);
};

TickerInfo.propTypes = {
	ticker: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
};

export default TickerInfo;