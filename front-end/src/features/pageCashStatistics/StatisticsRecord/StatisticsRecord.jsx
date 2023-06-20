import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import TextStyler from '@root/components/TextStyler/TextStyler';
import { FinancialValue } from '@root/components/FinancialValue/FinancialValue';
import ButtonDeleteItem from '@root/components/ButtonDeleteItem/ButtonDeleteItem';
import ValueDifference from '../ValueDifference/ValueDifference';
import { useEditStatisticsRecordMutation, useRemoveStatisticsRecordMutation } from '@root/api';
import { CATEGORY_TYPE_INCOME, CATEGORY_TYPE_SPENDING, CUR_USD } from '@root/constants/default-values';

import styles from './StatisticsRecord.module.scss';

const StatisticsRecord = ({ data }) => {
	const [description, setDescription] = useState(data.description);
	const { t, } = useTranslation();
	const [editStatisticsRecord] = useEditStatisticsRecordMutation();
	const [removeStatisticsRecord] = useRemoveStatisticsRecordMutation();
	const confirm = () => removeStatisticsRecord(data._id);
	const handleDescriptionEdit = input => {
		editStatisticsRecord({ ...data, description: input });
		setDescription(input);
	};

	return (
		<div className={styles.container}>
			<TextStyler className={styles.date}>
				{dayjs(data.date).format('DD.MM.YYYY')}
			</TextStyler>
			<TextStyler className={styles.value} size='big'>
				<FinancialValue value={parseFloat(data.value.toFixed(2))} currencyId={data.currencyId}/>
			</TextStyler>
			<ValueDifference
				value={parseFloat(data.difference.toFixed(2))}
				currencyId={data.currencyId}
				type={data.difference < 0 ? CATEGORY_TYPE_SPENDING : CATEGORY_TYPE_INCOME}
				className={styles.difference}
			/>
			<FinancialValue
				value={parseFloat(data.valueInUsd.toFixed(2))}
				currencyId={CUR_USD}
				className={styles.convertedValue}
			/>
			<ButtonDeleteItem
				confirmationPlacement="right"
				confirmationOkText={t('common.remove')}
				confirmationCancelText={t('common.keep')}
				onConfirm={confirm}
				title={t('common.sureToRemove')}
				iconClassName={styles.deleteIcon}
			/>
			<Typography.Text
				type='secondary'
				className={styles.comment}
				editable={{
					onChange: handleDescriptionEdit,
					tooltip: t('cashStatistics.addComment')
				}}
				ellipsis={{ tooltip: true }}
			>
				{description}
			</Typography.Text>
		</div>
	);
};

StatisticsRecord.propTypes = {
	data: PropTypes.shape({
		date: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		currencyId: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		difference: PropTypes.number.isRequired,
	}).isRequired
};

export default StatisticsRecord;