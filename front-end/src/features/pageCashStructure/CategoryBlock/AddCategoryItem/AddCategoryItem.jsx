import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
	DEFAULT_ZERO
} from '@root/constants/default-values';

import React, { useMemo, } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAddCashCategoryItemMutation } from '@root/api';
import ButtonAddItem from '@root/components/ButtonAddItem/ButtonAddItem';

import FormAddCashCategory from '../../FormAddCashCategory/FormAddCashCategory';

import styles from './AddCategoryItem.module.scss';

const AddCategoryItem = ({ type, }) => {
	const { t } = useTranslation();
	const [addCashCategoryItem] = useAddCashCategoryItemMutation();
	const memoizedStepInfo = useMemo(() => { // TODO is useMemo really improves performance?
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
	}, [type, t, addCashCategoryItem]);

	return (
		<ButtonAddItem
			className={styles.addButton}
			text={t('cashCategories.addItem')}
			size='medium'
			addItemFormElement={<FormAddCashCategory stepsMetaInfo={memoizedStepInfo}/>}
		/>
	);
};

AddCategoryItem.propTypes = {
	type: PropTypes.oneOf([CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING, CATEGORY_TYPE_FROZEN]).isRequired,
};

export default AddCategoryItem;