import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, message, } from 'antd';
import { DeleteOutlined, } from '@ant-design/icons';

import styles from './CategoryItem.module.scss';

import { CUR_USD, CUR_EUR, CUR_RUB, CATEGORY_TYPE_INCOME, } from '../../../../constants/default-values';
import { HideValue } from '../../../../components/HideValue/HideValue';

export const CategoryItem = ({ item }) => {
	const currency = {
		[CUR_USD]: '$',
		[CUR_EUR]: '€',
		[CUR_RUB]: '₽'
	};

	const confirm = () => message.info('Deleted');

	return (
		<div className={styles.container}>
			<div className={styles.sourceName}>{item.sourceName}&nbsp;</div>
			<HideValue>
				<div className={styles.sourceValue}>{item.type === CATEGORY_TYPE_INCOME ? '+' : '-'}{item.sourceValue}{currency[item.currency]}</div>
			</HideValue>
			<Popconfirm placement="right" title={'text'} onConfirm={confirm} okText="Yes" cancelText="No">
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