import React, { useEffect, } from 'react';
import { useDispatch, } from 'react-redux';
import { useNavigate, Outlet, } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import styles from './CashCategoriesPage.module.scss';

import { getCategories } from './CashCategoriesSlice';
import { URL_TUTORIAL } from '../../constants/urls';

const CashCategoriesPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isTutorialCompleted, ] = useLocalStorage('isTutorialCompleted', false);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		if(!isTutorialCompleted) {
			navigate(URL_TUTORIAL);
		}
	}, [isTutorialCompleted]);

	return (
		<div className={styles.container}>
			{isTutorialCompleted && <div>CATEGORIES</div>}

			<Outlet/>
		</div>
	);
};

export default CashCategoriesPage;