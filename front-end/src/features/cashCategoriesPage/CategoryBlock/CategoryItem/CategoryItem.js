import React from 'react';
import PropTypes from 'prop-types';
import { message, } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './CategoryItem.module.scss';

import {
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING, CATEGORY_TYPE_FROZEN,
} from 'constants/default-values';
import { FinancialValue } from 'components/FinancialValue/FinancialValue';
import { deleteFrozen, deleteIncome, deleteSpending } from '../../PageCashCategoriesSlice';
import ButtonDeleteItem from 'components/ButtonDeleteItem/ButtonDeleteItem';

export const CategoryItem = ({ item }) => {
	const dispatch = useDispatch();
	const { t, } = useTranslation();
	const confirm = () => {
		switch (item.type) {
			case CATEGORY_TYPE_INCOME: dispatch(deleteIncome(item.id));
				break;
			case CATEGORY_TYPE_SPENDING: dispatch(deleteSpending(item.id));
				break;
			case CATEGORY_TYPE_FROZEN: dispatch(deleteFrozen(item.id));
				break;
			default:
				console.error(`There is no category type ${item.type}`);
		}

		message.success(`${item.sourceName} ${t('common.removed')}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.sourceName}>{item.sourceName}&nbsp;</div>
			<FinancialValue value={item.sourceValue} type={item.type} currencyId={item.currency}/>
			<ButtonDeleteItem
				confirmationPlacement="right"
				confirmationOkText={t('common.remove')}
				confirmationCancelText={t('common.keep')}
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
	})
};