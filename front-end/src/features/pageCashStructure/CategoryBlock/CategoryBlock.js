import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
	DEFAULT_ZERO
} from 'constants/default-values';

import React, { useEffect, } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, } from 'antd';
import { useGetConversionRatesQuery } from 'api/';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import { Card } from 'components/Card/Card';

import { saveTotalSumByType, } from '../PageCashStructureSlice';

import styles from './CategoryBlock.module.scss';

import { CategoryItem } from './CategoryItem/CategoryItem';
import AddCategoryItem from './AddCategoryItem/AddCategoryItem';

const CategoryBlock = ({ title, type, items, }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const total = isFetching || error ?
		DEFAULT_ZERO
		: parseFloat(items.reduce((acc, el) => acc + el.sourceValue/(data.rates[el.currency].value || 1), DEFAULT_ZERO)
			.toFixed(1));

	useEffect(() => {
		if(data && !error) {
			dispatch(saveTotalSumByType({ type, total }));
		}
	}, [data, error, total, dispatch, type]);

	return (
		<Card className={styles.card}>
			<div className={styles.title}>
				{title}
			</div>
			<div className={styles.totalSum} data-value-hidden='false'>
				{t('common.total')}:&nbsp;
				{isFetching
					? <Spin size="small"/>
					: <FinancialValue value={total} type={type} currencyId={baseCurrencyKey}/>
				}
			</div>
			{items.length ?
				items.map(item => <CategoryItem item={item} key={item._id}/>)
				: <div className={styles.noItems}>{t('cashCategories.noItems')}</div>
			}
			<AddCategoryItem type={type}/>
		</Card>
	);
};

CategoryBlock.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf([CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING, CATEGORY_TYPE_FROZEN]).isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		sourceName: PropTypes.string.isRequired,
		sourceValue: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
	})).isRequired,
};

export default CategoryBlock;