import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import TextStyler from '../../../components/TextStyler/TextStyler';
import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';
import ButtonDeleteItem from '../../../components/ButtonDeleteItem/ButtonDeleteItem';
import ValueDifference from '../ValueDifference/ValueDifference';
import { useEditStatisticsRecordMutation, useRemoveStatisticsRecordMutation } from '../../../api';
import { CUR_USD } from '../../../constants/default-values';

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
		<Space size={0} direction='vertical' align='start'>
			<Space size='small' direction='horizontal' align='end'>
				<TextStyler className={styles.date}>
					{dayjs(data.date).format('DD.MM.YYYY')}
				</TextStyler>
				<TextStyler className={styles.value} size='big'>
					<FinancialValue value={data.value} currencyId={data.currencyId}/>
					<FinancialValue value={data.valueInUsd} currencyId={CUR_USD}/>
				</TextStyler>
				<ButtonDeleteItem
					confirmationPlacement="right"
					confirmationOkText={t('common.remove')}
					confirmationCancelText={t('common.keep')}
					onConfirm={confirm}
					title={t('common.sureToRemove')}
					iconClassName={styles.deleteIcon}
				/>
				<ValueDifference value={data.difference} currencyId={data.currencyId}/>
			</Space>
			<Typography.Paragraph
				type='secondary'
				className={styles.comment}
				editable={{
					onChange: handleDescriptionEdit,
				}}
			>
				{description}
			</Typography.Paragraph>
		</Space>
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