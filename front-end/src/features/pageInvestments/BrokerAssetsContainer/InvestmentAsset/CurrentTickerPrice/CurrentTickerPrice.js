import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { useGetBrokerAssetPriceQuery } from 'api';

import TextStyler from '../../../../../components/TextStyler/TextStyler';
import styles from '../InvestmentAsset.module.scss';
import { FinancialValue } from '../../../../../components/FinancialValue/FinancialValue';

const CurrentTickerPrice = ({ ticker }) => {
	const { t } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetBrokerAssetPriceQuery({ baseCurrencyKey, ticker });

	return (
		<>
			<TextStyler size='medium'  className={styles.caption} secondary>
				{t('brokerItem.pricePerUnit')}
			</TextStyler>
			{isFetching
				? <Spin size='small' />
				: <FinancialValue
					currencyId={baseCurrencyKey}
					value={data.toFixed(1)}
				/>}
		</>
	);
};

CurrentTickerPrice.propTypes = {
	ticker: PropTypes.string.isRequired
};

export default CurrentTickerPrice;