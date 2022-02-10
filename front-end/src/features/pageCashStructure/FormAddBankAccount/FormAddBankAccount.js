import { DEFAULT_EMPTY_STRING, DEFAULT_ZERO } from 'constants/default-values';

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, InputNumber, Button, Space, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../FormAddCashCategory/FormAddCashCategory.module.scss';
import SelectCurrency from '../../selectCurrency/SelectCurrency';
import { addBankAccount } from '../PageCashStructureSlice';

const FormAddBankAccount = ({ bankId }) => {
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const [form] = Form.useForm();
	const formRef = useRef();
	const dispatch = useDispatch();
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const initialValues = {
		accountName: DEFAULT_EMPTY_STRING,
		accountValue: DEFAULT_EMPTY_STRING,
		currency: baseCurrencyKey
	};
	const onFinish = ({ accountName, accountValue, currency }) => {
		dispatch(addBankAccount({ bankId, account: {
			name: accountName,
			value: accountValue,
			currencyId: currency,
		} }));
		formRef.current.resetFields(['accountName', 'accountValue']);
		setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { accountName, accountValue }) => {
		setIsSaveButtonDisabled(!Boolean(accountName) || !Boolean(accountValue));
	};

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
				<Space size='small'>
					<Button disabled={isSaveButtonDisabled} type="primary" shape="round" size='medium' htmlType="submit" className={styles.button}>
						{t('common.save')}
					</Button>
				</Space>
			</Space>
		</Form>
	);
};

FormAddBankAccount.propTypes = {
	bankId: PropTypes.string.isRequired
};

export default FormAddBankAccount;