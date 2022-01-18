import React, { useMemo, } from 'react';
import { Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';

import styles from './AddCategoryForm.module.scss';
import { Input } from '../../../components/controls/Input/Input';

import { CUR_EUR, CUR_RUB, CUR_USD, DEFAULT_EMPTY_STRING, LANG_RU, } from '../../../constants/default-values';

const AddCategoryForm = () => {
	const { t, i18n, } = useTranslation();
	const currency = i18n.language === LANG_RU ? CUR_RUB : CUR_USD;
	const validationSchema = useMemo( () => yup.object({
		sourceName: yup
			.string(t('cashCategories.errorEnterSourceName'))
			.required(t('cashCategories.errorSourceRequired')),
		sourceValue: yup
			.number()
			.typeError(t('cashCategories.errorSourceValueNumber'))
			.positive(t('cashCategories.errorSourceValuePositive'))
			.required(t('cashCategories.errorSourceValueRequired')),
	}), [i18n.language]);

	const formik = useFormik({
		initialValues: {
			sourceName: DEFAULT_EMPTY_STRING,
			sourceValue: DEFAULT_EMPTY_STRING,
			currency
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(JSON.stringify(values, null, 2));
			// TODO add saving on server
			formik.resetForm();
		},
	});
	console.log('test', formik);

	return (
		<form onSubmit={formik.handleSubmit} className={styles.form}>
			<Input
				id="sourceName"
				name="sourceName"
				value={formik.values.sourceName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.sourceName && Boolean(formik.errors.sourceName)}
				placeholder={t('cashCategories.incomeSourceName')}
				className={styles.inputName}
			/>
			<Input
				id="sourceValue"
				name="sourceValue"
				value={formik.values.sourceValue}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.sourceValue && Boolean(formik.errors.sourceValue)}
				placeholder={t('cashCategories.incomeSourceValue')}
				className={styles.inputValue}
			/>
			<Select
				id="currency"
				name="currency"
				defaultValue={currency}
				value={formik.values.currency}
				onChange={(value) => { formik.setFieldValue('currency', value); }}
				className={styles.selectCurrency}
			>
				<Select.Option value={CUR_RUB}>RUR</Select.Option>
				<Select.Option value={CUR_USD}>USD</Select.Option>
				<Select.Option value={CUR_EUR}>EUR</Select.Option>
			</Select>
			<Button type="primary" shape="round" size='medium' htmlType="submit" className={styles.button}>
				{t('cashCategories.save')}
			</Button>
		</form>
	);
};

export default AddCategoryForm;