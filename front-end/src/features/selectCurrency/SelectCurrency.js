import React from 'react';
import { Select, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useGetAllCurrenciesQuery } from '../../api/';

import styles from './Select.module.scss';

const { Option } = Select;
const SelectCurrency = (props) => {
	const { t, } = useTranslation();
	const { baseCurrencyKey, } = useSelector(state => state.currencies);
	const { data, error, isFetching, } = useGetAllCurrenciesQuery();

	return (
		<>{ error ?
			<Skeleton.Input style={{ width: 200 }} active/>
			: <Select
				{...props}
				onChange={props.onChange}
				showSearch
				placeholder={t('currency.selectCurrency')}
				optionFilterProp="children"
				className={styles.select}
				defaultValue={props.defaultValue || baseCurrencyKey}
			    loading={isFetching}
			>
				{!isFetching && Object.keys(data?.list)?.map( currencyId =>
					<Option key={currencyId} value={currencyId} className={styles.currencyOption}>
						{`${currencyId} - ${data?.list[currencyId]}`}
					</Option>)}
			</Select> }
		</>
	);
};

export default SelectCurrency;