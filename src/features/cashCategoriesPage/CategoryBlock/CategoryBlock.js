import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './CategoryBlock.module.scss';

import { CategoryItem } from './CategoryItem/CategoryItem';
import { DEFAULT_ZERO } from '../../../constants/default-values';
import { HideValue } from '../../../components/HideValue/HideValue';

const CategoryBlock = ({ title, addItemHandler, items, }) => {
	const { t } = useTranslation();
	const total = items.reduce((acc, el) => acc + el.sourceValue, DEFAULT_ZERO);

	return (
		<div className={styles.container}>
			<div className={styles.title}>{title}</div>
			<div className={styles.totalSum} data-value-hidden='false'>{t('cashCategories.total')}:&nbsp;
				<HideValue>{total}</HideValue>
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