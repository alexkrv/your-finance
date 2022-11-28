import React from 'react';
import { Select, Skeleton, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ExclamationCircleOutlined, DownOutlined, } from '@ant-design/icons';

import { useGetAllCurrenciesQuery } from '../../api/';

import styles from './Select.module.scss';

const { Option } = Select;
const SelectCurrency = (props) => {
	const { t, } = useTranslation();
	const { baseCurrencyKey, conversionRates: { isStale, timestamp } } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetAllCurrenciesQuery();
	const suffixIcon = isStale ?
		<Tooltip
			title={`${t('cashCategories.staleConversionRates')} ${new Date(timestamp)}`}
			color='black'
			placement='bottomRight'
			arrowPointAtCenter={true}
		>
			<ExclamationCircleOutlined style={{ fontSize: 'var(--font-size-large)', color: 'var(--icon-secondary-red)' }}/>
		</Tooltip>
		: <DownOutlined/>;

	return (
		<>{ error ?
			<Skeleton.Input style={{ width: 200 }} active/>
			: <>
				<Select
					{...props}
					onChange={props.onChange}
					showSearch
					placeholder={t('currency.selectCurrency')}
					optionFilterProp="children"
					className={styles.select}
					defaultValue={props.defaultValue || baseCurrencyKey}
					suffixIcon={suffixIcon}
			    	loading={isFetching}
				>
					{!isFetching && Object.keys(data?.list)?.map( currencyId =>
						<Option key={currencyId} value={currencyId} className={styles.currencyOption}>
							{`${currencyId} - ${data?.list[currencyId]}`}
						</Option>)}
				</Select>
			</> }
		</>
	);
};

export default SelectCurrency;