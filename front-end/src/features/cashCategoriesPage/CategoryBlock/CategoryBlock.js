import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Spin, } from 'antd';

import styles from './CategoryBlock.module.scss';

import { CategoryItem } from './CategoryItem/CategoryItem';
import { HideValue } from '../../../components/HideValue/HideValue';
import { useGetConversionRatesQuery } from '../../../services/currencyApiSlice';
import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
	DEFAULT_ZERO
} from '../../../constants/default-values';
import ButtonAddItem from '../../../components/ButtonAddItem/ButtonAddItem';
import FormAddCashCategory from '../FormAddCashCategory/FormAddCashCategory';
import { addFrozen, addIncome, addSpending } from '../PageCashCategoriesSlice';

const CategoryBlock = ({ title, type, items, }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { t } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetConversionRatesQuery(baseCurrencyKey);
	const total = isFetching || error ? DEFAULT_ZERO : Math.floor(items.reduce((acc, el) => acc + el.sourceValue/data.data[el.currency], DEFAULT_ZERO));
	const showModal = () => setIsModalVisible(true);
	const handleOk = () => setIsModalVisible(false);
	const handleCancel = () => setIsModalVisible(false);
	const memoizedStepInfo = useMemo(() => {
		const stepsMetaInfo = {
			[CATEGORY_TYPE_INCOME]: {
				type: CATEGORY_TYPE_INCOME,
				title: t('cashCategories.addIncome'),
				addItemHandler: addIncome,
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
				addItemHandler: addSpending,
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
				addItemHandler: addFrozen,
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
	}, [type]);

	return (
		<div className={styles.container}>
			<div className={styles.title}>{title}</div>
			<div className={styles.totalSum} data-value-hidden='false'>{t('cashCategories.total')}:&nbsp;
				{isFetching ? <Spin size="small"/> : <HideValue><span className={styles.totalValue}>{total}</span>&nbsp;{baseCurrencyKey}</HideValue>}
			</div>
			{items.length ?
				items.map(item => <CategoryItem item={item} key={item.id}/>)
				: <div className={styles.noItems}>{t('cashCategories.noItems')}</div>
			}
			<ButtonAddItem
				text={t('cashCategories.addItem')}
				size='medium'
				onClick={showModal}
			/>
			<Modal width={'fit-content'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false}>
				<FormAddCashCategory stepsMetaInfo={memoizedStepInfo}/>
			</Modal>
		</div>
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