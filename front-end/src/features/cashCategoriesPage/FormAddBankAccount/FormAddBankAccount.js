import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, InputNumber, Button, Space, notification, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../FormAddCashCategory/FormAddCashCategory.module.scss';

import { CATEGORY_TYPE_SPENDING, DEFAULT_EMPTY_STRING, DEFAULT_ZERO } from '../../../constants/default-values';
import SelectCurrency from '../../selectCurrency/SelectCurrency';

const FormAddBankAccount = props => {
	const [form] = Form.useForm();
	const formRef = useRef();
	const dispatch = useDispatch();
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const initialValues = {
		bankName: DEFAULT_EMPTY_STRING,
		accountName: DEFAULT_EMPTY_STRING,
		accountValue: DEFAULT_EMPTY_STRING,
		currency: baseCurrencyKey
	};
	const onFinish = (values) => {
		// dispatch(stepsMetaInfo[stepNum].addItemHandler(values));
		formRef.current.resetFields(['bankName', 'accountName', 'accountValue']);
		// setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { sourceName, sourceValue }) => {
		// setIsSaveButtonDisabled(!Boolean(sourceName) || !Boolean(sourceValue));
	};

	// Avatar Name
	// Account #1: name + value + currency

	return (
		<div>
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
				<h2 className={styles.caption}>{t('bankItem.addAccount')}</h2>
				<Space size='small' align='start' direction='vertical' className={styles.inputControls}>
					<Form.Item
						name="accountName"
						className={styles.inputControl}
					>
						<Input placeholder={t('bankItem.inputAccountName')}/>
					</Form.Item>
					<Form.Item
						name="accountValue"
						className={styles.inputControl}
					>
						<InputNumber
							style={{ width: '100%' }}
							min={DEFAULT_ZERO}
							max={Number.POSITIVE_INFINITY}
							placeholder={t('bankItem.inputAccountValue')}
						/>
					</Form.Item>
					<Form.Item
						name="currency"
						className={styles.inputControl}
					>
						<SelectCurrency/>
					</Form.Item>
					<Space size={'small'}>
						<Button disabled={false/*TODO*/} type="primary" shape="round" size='medium' htmlType="submit" className={styles.button}>
							{t('cashCategories.save')}
						</Button>
					</Space>
				</Space>
			</Form>
		</div>
	);
};

export default FormAddBankAccount;