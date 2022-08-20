import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
	DEFAULT_ZERO
} from 'constants/default-values';

import React, { useMemo, useEffect, } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, } from 'antd';
import { useGetConversionRatesQuery, useAddCashCategoryItemMutation } from 'api/';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import ButtonAddItem from 'components/ButtonAddItem/ButtonAddItem';
import { Card } from 'components/Card/Card';

import FormAddCashCategory from '../FormAddCashCategory/FormAddCashCategory';
import { saveTotalSumByType, } from '../PageCashStructureSlice';

import styles from './CategoryBlock.module.scss';

import { CategoryItem } from './CategoryItem/CategoryItem';

const CategoryBlock = ({ title, type, items, }) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const [addCashCategoryItem] = useAddCashCategoryItemMutation();
	const total = isFetching || error ?
		DEFAULT_ZERO
		: parseFloat(items.reduce((acc, el) => acc + el.sourceValue/(data.rates[el.currency].value || 1), DEFAULT_ZERO)
			.toFixed(1));
	const memoizedStepInfo = useMemo(() => {
		const stepsMetaInfo = {
			[CATEGORY_TYPE_INCOME]: {
				type: CATEGORY_TYPE_INCOME,
				title: t('cashCategories.addIncome'),
				addItemHandler: addCashCategoryItem,
				sourceInput: {
					placeholder: t('cashCategories.incomeSourceName'),
					error: t('cashCategories.errorSourceRequired')
				},
				sourceValue: {
					placeholder: t('cashCategories.incomeSourceValue'),
					error: t('cashCategories.errorSourceValueRequired'),
					minValue: DEFAULT_ZERO,
					maxValue: Number.POSITIVE_INFINITY
				},
			},
			[CATEGORY_TYPE_SPENDING]: {
				type: CATEGORY_TYPE_SPENDING,
				title: t('cashCategories.addSpending'),
				addItemHandler: addCashCategoryItem,
				sourceInput: {
					placeholder: t('cashCategories.spendingSourceName'),
					error: t('cashCategories.errorSourceRequired')
				},
				sourceValue: {
					placeholder: t('cashCategories.spendingSourceValue'),
					error: t('cashCategories.errorSourceValueRequired'),
					minValue: DEFAULT_ZERO,
					maxValue: Number.POSITIVE_INFINITY
				},
			},
			[CATEGORY_TYPE_FROZEN]: {
				type: CATEGORY_TYPE_FROZEN,
				title: t('cashCategories.addFrozen'),
				addItemHandler: addCashCategoryItem,
				sourceInput: {
					placeholder: t('cashCategories.frozenSourceName'),
					error: t('cashCategories.errorSourceRequired')
				},
				sourceValue: {
					placeholder: t('cashCategories.frozenSourceValue'),
					error: t('cashCategories.errorSourceValueRequired'),
					minValue: DEFAULT_ZERO,
					maxValue: Number.POSITIVE_INFINITY
				},
			}
		};

		return [stepsMetaInfo[type]];
	}, [type, t]);

	useEffect(() => {
		if(data && !error) {
			dispatch(saveTotalSumByType({ type, total }));
		}
	}, [data, error, total, dispatch, type]);

	return (
		<Card>
			<div className={styles.title}>{title}</div>
			<div className={styles.totalSum} data-value-hidden='false'>{t('common.total')}:&nbsp;
				{isFetching ?
					<Spin size="small"/>
					: <FinancialValue value={total} type={type} currencyId={baseCurrencyKey}/>
				}
			</div>
			{items.length ?
				items.map(item => <CategoryItem item={item} key={item._id}/>)
				: <div className={styles.noItems}>{t('cashCategories.noItems')}</div>
			}
			<ButtonAddItem
				className={styles.addButton}
				text={t('cashCategories.addItem')}
				size='medium'
				addItemFormElement={<FormAddCashCategory stepsMetaInfo={memoizedStepInfo}/>}
			/>
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