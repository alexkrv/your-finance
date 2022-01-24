import React, { useEffect, useRef, useState, } from 'react';
import { Form, Input, InputNumber, Button, Space, notification, } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './FormAddCashCategory.module.scss';

import {
	CATEGORY_TYPE_SPENDING,
	DEFAULT_EMPTY_STRING,
	DEFAULT_ZERO,
} from '../../../constants/default-values';
import SelectCurrency from '../../selectCurrency/SelectCurrency';
import { useGetAllCurrenciesQuery } from '../../../services/currencyApiSlice';

const FormAddCashCategory = ({ stepsMetaInfo, handleNextOnLastStep, }) => {
	const [form] = Form.useForm();
	const formRef = useRef();
	const dispatch = useDispatch();
	const { t, } = useTranslation();
	const [stepNum, setStepNum] = useState(DEFAULT_ZERO);
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const { error } = useGetAllCurrenciesQuery();
	const { incomes, spending } = useSelector(state => state.cashCategories.categories); // TODO
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const initialValues = {
		sourceName: DEFAULT_EMPTY_STRING,
		sourceValue: DEFAULT_EMPTY_STRING,
		currency: baseCurrencyKey
	};
	const goNextHandler = () => {
		const lastStepNum = stepsMetaInfo.length;
		const nextStepNum = stepNum + 1;

		if(lastStepNum === nextStepNum) {
			handleNextOnLastStep();
		} else {
			setStepNum(nextStepNum);
		}
	};
	const goBackHandler = () => setStepNum(stepNum - 1);
	const onFinish = (values) => {
		dispatch(stepsMetaInfo[stepNum].addItemHandler(values));
		formRef.current.resetFields(['sourceName', 'sourceValue']);
		setIsSaveButtonDisabled(true);
	};
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
			<div className={styles.captionContainer}>
				<h2 className={styles.caption}>{stepsMetaInfo[stepNum].title}
				</h2>
				<Space size='small'>
					{ stepNum !== DEFAULT_ZERO && //TODO
                <Button shape='round' ghost size='medium' className={styles.button} onClick={goBackHandler}>
                	{t('cashCategories.back')}
                </Button> }
					{ (Boolean(incomes.length) || Boolean(spending.length)) &&
                <Button type="secondary" shape="round" size='medium' className={styles.button} onClick={goNextHandler}>
                	{t('cashCategories.next')}
                </Button> }
				</Space>
			</div>
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
						<Input placeholder={stepsMetaInfo[stepNum].sourceInput.placeholder}/>
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
							min={stepsMetaInfo[stepNum].sourceValue.minValue}
							max={stepsMetaInfo[stepNum].sourceValue.maxValue}
							placeholder={stepsMetaInfo[stepNum].sourceValue.placeholder}
							prefix={stepsMetaInfo[stepNum].type === CATEGORY_TYPE_SPENDING ? '-' : '+'}
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

FormAddCashCategory.propTypes = {
	handleNextOnLastStep: PropTypes.func.isRequired,
	stepsMetaInfo: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		addItemHandler: PropTypes.func.isRequired,
		sourceInput: PropTypes.shape({
			placeholder: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired
		}),
		sourceValue: PropTypes.shape({
			placeholder: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			minValue: PropTypes.number.isRequired,
			maxValue: PropTypes.number.isRequired
		}),
	}))
};

export default FormAddCashCategory;