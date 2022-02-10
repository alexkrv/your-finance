import React from 'react';
import PropTypes from 'prop-types';
import { Space, Tooltip, } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import TextStyler from '../../../components/TextStyler/TextStyler';
import { FinancialValue } from '../../../components/FinancialValue/FinancialValue';
import ButtonDeleteItem from '../../../components/ButtonDeleteItem/ButtonDeleteItem';

import styles from './StatisticsRecord.module.scss';

const StatisticsRecord = ({ data }) => {
	const { t, } = useTranslation();
	const confirm = () => {};

	return (
		<Space size={0} direction='vertical' align='start'>
			<Space size='small' direction='horizontal' align='end'>
				<TextStyler className={styles.date}>
					{dayjs(data.timeStamp).format('DD.MM.YYYY')}
				</TextStyler>
				<TextStyler className={styles.value} size='big'>
					<FinancialValue value={`${data.value} ${data.currencyId}`}/>
				</TextStyler>
				<ButtonDeleteItem
					confirmationPlacement="right"
					confirmationOkText={t('common.remove')}
					confirmationCancelText={t('common.keep')}
					onConfirm={confirm}
					title={t('common.sureToRemove')}
					iconClassName={styles.deleteIcon}
				/>
			</Space>
			<Tooltip placement="rightTop" title={data.comment}>
				<Space size='small' direction='horizontal' align='start'>
					<TextStyler className={styles.comment}>
						{data.comment}
					</TextStyler>
				</Space>
			</Tooltip>
		</Space>
	);
};

StatisticsRecord.propTypes = {
	data: PropTypes.shape({
		timeStamp: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
		currencyId: PropTypes.string.isRequired,
		comment: PropTypes.string.isRequired,
	}).isRequired
};

export default StatisticsRecord;