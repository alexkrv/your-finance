import React, { useEffect, useRef, useState, } from 'react';
import { Form, Input, InputNumber, Button, Space, notification, } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './CashCategoryStarterForm.module.scss';

import {
	DEFAULT_EMPTY_STRING,
	DEFAULT_ZERO,
} from '../../../constants/default-values';
import { addIncome, addSpending, } from '../PageCashCategoriesSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTE_CASH_CATEGORIES } from '../../../constants/routes';
import useLocalStorage from 'use-local-storage';
import SelectCurrency from '../../selectCurrency/SelectCurrency';
import { useGetAllCurrenciesQuery } from '../../../services/currencyApiSlice';

const CashCategoryStarterForm = () => {
	const [form] = Form.useForm();
	const formRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [, setIsTutorialCompleted] = useLocalStorage('isTutorialCompleted', false);
	const { t, } = useTranslation();
	const [isSpendingMode, setSpendingMode] = useState(false);
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const { error } = useGetAllCurrenciesQuery();
	const { incomes, spending } = useSelector(state => state.cashCategories.categories);
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const onFinish = (values) => {
		if(isSpendingMode) {
			dispatch(addSpending(values));
		} else {
			dispatch(addIncome(values));
		}

		formRef.current.resetFields(['sourceName', 'sourceValue']);
	};
	const initialValues = {
		sourceName: DEFAULT_EMPTY_STRING,
		sourceValue: DEFAULT_EMPTY_STRING,
		currency: baseCurrencyKey
	};
	const goNextHandler = () => {
		if(isSpendingMode) {
			navigate(ROUTE_CASH_CATEGORIES);
			setIsTutorialCompleted(true);
		} else {
			setSpendingMode(true);
		}
	};
	const goBackHandler = () => setSpendingMode(false);
	const onValuesChange = (changedValues, { sourceName, sourceValue }) => {
		setIsSaveButtonDisabled(!Boolean(sourceName) || !Boolean(sourceValue));
	};

	useEffect(() => {
		if(error) {
			notification.error({
				message: t('currency.errorGetCurrListFailedTitle'),
				description: t('currency.errorGetCurrListFailedDescription'),
				placement: 'bottomRight',
				duration: 3,
			});
		}

	}, [error]);

	return (
		<Form
			form={form}
			ref={formRef}
			onFinish={onFinish}
			onValuesChange={onValuesChange}
			initialValues={initialValues}
			layout="vertical"
			className={styles.form}
			wrapperCol={{ span: 100 }}
		>
			<h2 className={styles.caption}>{isSpendingMode ?
				t('cashCategories.addSpending')
				:t('cashCategories.addIncome')
			}
			<Space size='small'>
				{ isSpendingMode &&
                <Button shape='round' ghost size='medium' className={styles.button} onClick={goBackHandler}>
                	{t('cashCategories.back')}
                </Button> }
				{ ((!isSpendingMode && Boolean(incomes.length)) || (isSpendingMode && Boolean(spending.length))) &&
                <Button type="secondary" shape="round" size='medium' className={styles.button} onClick={goNextHandler}>
                	{t('cashCategories.next')}
                </Button> }
			</Space>
			</h2>
			<div className={styles.inputControls}>
				<Space size='small' align='start'>
					<Form.Item
						name="sourceName"
						rules={[
							{
								required: true,
								message: t('cashCategories.errorSourceRequired')
							},
						]}
						className={styles.inputControl}
					>
						<Input placeholder={t('cashCategories.incomeSourceName')}/>
					</Form.Item>
					<Form.Item
						name="sourceValue"
						rules={[
							{
								required: true,
								message: t('cashCategories.errorSourceValueRequired')
							},
						]}
						className={styles.inputControl}
					>
						<InputNumber
							style={{ width: '100%' }}
							min={ isSpendingMode ? Number.NEGATIVE_INFINITY : DEFAULT_ZERO}
							max={ isSpendingMode ? DEFAULT_ZERO : Number.POSITIVE_INFINITY}
							placeholder={t('cashCategories.incomeSourceValue')}
						/>
					</Form.Item>
					<Form.Item
						name="currency"
						rules={[
							{
								required: true,
							},
						]}
						className={styles.inputControl}
					>
						<SelectCurrency/>
					</Form.Item>
				</Space>
			</div>
			<Space size={'small'}>
				<Button disabled={isSaveButtonDisabled} type="primary" shape="round" size='medium' htmlType="submit" className={styles.button}>
					{t('cashCategories.save')}
				</Button>
			</Space>
		</Form>
	);
};

export default CashCategoryStarterForm;