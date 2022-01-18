import React, { useEffect, } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector, } from 'react-redux';

import styles from './CashCategoriesPage.module.scss';

import { getCategories } from './CashCategoriesSlice';
import { DEFAULT_ZERO } from '../../constants/default-values';
import AddCategoryForm from './addCategoryForm/AddCategoryForm';

const CashCategoriesPage = () => {
	const dispatch = useDispatch();
	const categories = useSelector(state => state.cashCategories.categories);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	const { t, } = useTranslation();
	const isFormVisible = categories.length === DEFAULT_ZERO;

	return (
		<div className={styles.container}>
			{isFormVisible ? <AddCategoryForm/> : <div>Categories</div>}
		</div>
	);
};

CashCategoriesPage.propTypes = {

};

export default CashCategoriesPage;