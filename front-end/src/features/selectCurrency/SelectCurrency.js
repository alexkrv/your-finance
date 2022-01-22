import React from 'react';
import { Select, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styles from './Select.module.scss';

import { useGetAllCurrenciesQuery } from '../../services/currencyApiSlice';

const { Option } = Select;
const SelectCurrency = () => {
	const { t, } = useTranslation();
	const baseCurrency = useSelector(state => state.currencies.baseCurrency);
	const { data, error/*TODO create fallback*/, isFetching, } = useGetAllCurrenciesQuery();
	console.log('data', data, data?.[baseCurrency]);

	return (
		<>{ isFetching ? <Skeleton.Input style={{ width: 200 }} active/>: <Select
			showSearch
			placeholder={t('currency.selectCurrency')}
			optionFilterProp="children"
			className={styles.select}
			defaultValue={`${baseCurrency} - ${data[baseCurrency]?.currencyName}`}
			// onChange={onChange}
			// onSearch={onSearch}
			// filterOption={(input, option) =>
			// 	option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			// }
		>
			{Object.keys(data)?.map( currencyId =>
				<Option key={data[currencyId]?.currencyName} value={`${currencyId} - ${data[currencyId]?.currencyName}`} className={styles.currencyOption}>
					{currencyId}&nbsp;-&nbsp;{data[currencyId]?.currencyName}
				</Option>)}
		</Select> }</>
	);
};

export default SelectCurrency;