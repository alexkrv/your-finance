import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import styles from './CategoryBlock.module.scss';

import { CategoryItem } from './CategoryItem/CategoryItem';
import { HideValue } from '../../../components/HideValue/HideValue';
import { useGetConversionRatesQuery } from '../../../services/currencyApiSlice';
import { DEFAULT_ZERO } from '../../../constants/default-values';

const CategoryBlock = ({ title, addItemHandler, items, }) => {
	const { t } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error/*TODO make handler*/, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const total = isFetching ? DEFAULT_ZERO : Math.floor(items.reduce((acc, el) => acc + el.sourceValue/data.data[el.currency], 0));

	return (
		<div className={styles.container}>
			<div className={styles.title}>{title}</div>
			<div className={styles.totalSum} data-value-hidden='false'>{t('cashCategories.total')}:&nbsp;
				{isFetching ? <Spin size="small"/> : <HideValue>{total}&nbsp;{baseCurrencyKey}</HideValue>}
			</div>
			{items.map(item => <CategoryItem item={item} key={item.id}/>)}
		</div>
	);
};

CategoryBlock.propTypes = {
	title: PropTypes.string.isRequired,
	addItemHandler: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(PropTypes.shape({
		sourceName: PropTypes.string.isRequired,
		sourceValue: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
	})).isRequired,
};

export default CategoryBlock;