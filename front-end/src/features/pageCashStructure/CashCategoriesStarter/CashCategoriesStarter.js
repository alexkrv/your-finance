import React, { useCallback, useMemo, } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import FormAddCashCategory from '../FormAddCashCategory/FormAddCashCategory';
import {
	CATEGORY_TYPE_FROZEN,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING,
	DEFAULT_ZERO
} from '../../../constants/default-values';
import { disableStarterForm, } from '../PageCashStructureSlice';
import { useAddCashCategoryItemMutation } from '../../../api';

const CashCategoriesStarter = () => {
	const { t, } = useTranslation();
	const dispatch = useDispatch();
	const [addCashCategoryItem] = useAddCashCategoryItemMutation();
	const stepsMetaInfo = useMemo( () => [{
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
	{
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
	{
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
	}], [t] );

	const handleNextOnLastStep = useCallback(() => {
		dispatch(disableStarterForm());
		localStorage.setItem('isCategoriesStarterFinished', 'true');// TODO check why useLocalStorage hook doesn't work
	}, [dispatch,]);

	return (
		<FormAddCashCategory
			stepsMetaInfo={stepsMetaInfo}
			handleNextOnLastStep={handleNextOnLastStep}
		/>
	);
};

export default CashCategoriesStarter;