import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';
import { Tooltip } from 'antd';

import { useDeleteCashCategoryItemMutation } from '../../../../api';

import styles from './CategoryItem.module.scss';

export const CategoryItem = ({ item }) => {
	const { t, } = useTranslation();
	const [deleteCashCategoryItem] = useDeleteCashCategoryItemMutation();
	const confirm = () => deleteCashCategoryItem(item);

	return (
		<div className={styles.container}>
			<Tooltip
				title={item.sourceName}
				color='black'
				placement='left'
			>
				<div className={styles.sourceName}>
					{item.sourceName}&nbsp;
				</div>
			</Tooltip>
			<FinancialValue
				value={item.sourceValue}
				type={item.type}
				currencyId={item.currency}
			/>
			<ButtonDeleteItem
				confirmationPlacement="right"
				confirmationOkText={t('common.remove')}
				confirmationCancelText={t('common.keep')}
				afterActionText={`${item.sourceName} ${t('common.removed')}`}
				onConfirm={confirm}
				title={t('common.sureToRemove')}
				iconClassName={styles.deleteIcon}
			/>
		</div>
	);
};

CategoryItem.propTypes = {
	item: PropTypes.shape({
		sourceName: PropTypes.string.isRequired,
		sourceValue: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
	}).isRequired
};