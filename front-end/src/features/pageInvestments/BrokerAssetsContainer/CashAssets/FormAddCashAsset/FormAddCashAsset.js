import { DEFAULT_EMPTY_STRING, DEFAULT_ZERO } from 'constants/default-values';

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Button, Space, } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useAddBrokerAssetMutation } from 'api';

import SelectCurrency from '../../../../selectCurrency/SelectCurrency';

import styles from './FormAddCashAsset.module.scss';

const FormAddCashAsset = ({ brokerId }) => {
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const [form] = Form.useForm();
	const formRef = useRef();
	const { t, } = useTranslation();
	const [addBrokerAsset] = useAddBrokerAssetMutation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const initialValues = {
		accountValue: DEFAULT_EMPTY_STRING,
		currency: baseCurrencyKey
	};
	const onFinish = ({ accountValue, currency }) => {
		addBrokerAsset({
			brokerId,
			type: 'cash',
			name: currency,
			amount: accountValue,
		});
		formRef.current.resetFields(['accountValue']);
		setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { accountValue }) => setIsSaveButtonDisabled(!Boolean(accountValue));

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
			<h2 className={styles.caption}>{t('brokerItem.addBrokerAssetCash')}</h2>
			<Space size='small' align='start' direction='vertical' className={styles.inputControls}>
				<Form.Item
					name="accountValue"
					className={styles.inputControl}
				>
					<InputNumber
						style={{ width: '100%' }}
						min={DEFAULT_ZERO}
						max={Number.POSITIVE_INFINITY}
						placeholder={t('brokerItem.inputCashValue')}
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

FormAddCashAsset.propTypes = {
	brokerId: PropTypes.string.isRequired
};

export default FormAddCashAsset;