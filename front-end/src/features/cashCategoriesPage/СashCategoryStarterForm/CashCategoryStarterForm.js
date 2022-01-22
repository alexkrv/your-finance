import React, { useRef, useState, } from 'react';
import { Form, Input, InputNumber, Button, Space, } from 'antd';
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

const CashCategoryStarterForm = () => {
	const formRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [, setIsTutorialCompleted] = useLocalStorage('isTutorialCompleted', false);
	const { t, } = useTranslation();
	const [isSpendingMode, setSpendingMode] = useState(false);

	const { incomes, spending } = useSelector(state => state.cashCategories.categories);
	const baseCurrency = useSelector(state => state.currencies.baseCurrency);
	const onFinish = (values) => {
		if(isSpendingMode) {
			dispatch(addSpending(values));
		} else {
			dispatch(addIncome(values));
		}

		formRef.current.resetFields();
	};
	const initialValues = {
		sourceName: DEFAULT_EMPTY_STRING,
		sourceValue: DEFAULT_ZERO,
		currency: baseCurrency
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

	return (
		<Form
			ref={formRef}
			onFinish={onFinish}
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
				<Space size='small'>
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
				<Button type="primary" shape="round" size='medium' htmlType="submit" className={styles.button}>
					{t('cashCategories.save')}
				</Button>
			</Space>
		</Form>
	);
};

export default CashCategoryStarterForm;