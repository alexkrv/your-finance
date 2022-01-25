import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, message, } from 'antd';
import { DeleteOutlined, } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './CategoryItem.module.scss';

import {
	CUR_USD,
	CUR_EUR,
	CUR_RUB,
	CATEGORY_TYPE_INCOME,
	CATEGORY_TYPE_SPENDING, CATEGORY_TYPE_FROZEN,
} from '../../../../constants/default-values';
import { HideValue } from '../../../../components/HideValue/HideValue';
import { deleteFrozen, deleteIncome, deleteSpending } from '../../PageCashCategoriesSlice';

export const CategoryItem = ({ item }) => {
	const dispatch = useDispatch();
	const { t, } = useTranslation();
	const currency = {
		[CUR_USD]: '$',
		[CUR_EUR]: '€',
		[CUR_RUB]: '₽'
	};

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

		message.info(`${item.sourceName} ${t('cashCategories.removed')}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.sourceName}>{item.sourceName}&nbsp;</div>
			<HideValue>
				<div className={styles.sourceValue}>{item.type === CATEGORY_TYPE_INCOME ? '+' : '-'}{item.sourceValue}{currency[item.currency]}</div>
			</HideValue>
			<Popconfirm
				placement="right"
				title={t('cashCategories.sureToRemove')}
				onConfirm={confirm}
				okText={t('cashCategories.remove')}
				cancelText={t('cashCategories.keep')}
			>
				<DeleteOutlined className={styles.deleteIcon} />
			</Popconfirm>
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