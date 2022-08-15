import { DEFAULT_EMPTY_STRING, DEFAULT_ZERO } from 'constants/default-values';

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Button, Space, Typography, Input } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCurrency from 'features/selectCurrency/SelectCurrency';

import styles from './FormAddAsset.module.scss';

const FormAddAsset = ({
	addAssetCaption,
	isAssetNameRequired,
	submitHandler,
	isPricePerUnitRequired,
}) => {
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const [form] = Form.useForm();
	const formRef = useRef();
	const { t, } = useTranslation();
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const initialValues = {
		assetName: DEFAULT_EMPTY_STRING,
		assetAmount: DEFAULT_EMPTY_STRING,
		assetCurrency: baseCurrencyKey,
		purchasePricePerUnit: DEFAULT_ZERO
	};
	const onFinish = data => {
		submitHandler(data);
		formRef.current.resetFields(['assetAmount']);
		setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { assetAmount }) => setIsSaveButtonDisabled(!Boolean(assetAmount));

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
			<Typography.Title
				level={2}
				className={styles.caption}>
				{addAssetCaption}
			</Typography.Title>
			<Space size='small' align='start' direction='vertical' className={styles.inputControls}>
				{isAssetNameRequired && <Form.Item
					name="assetName"
					className={styles.inputControl}
				>
					<Input placeholder={t('brokerItem.inputAssetName')}/>
				</Form.Item>}
				<Form.Item
					name="assetAmount"
					className={styles.inputControl}
				>
					<InputNumber
						style={{ width: '100%' }}
						min={DEFAULT_ZERO}
						max={Number.POSITIVE_INFINITY}
						placeholder={t('brokerItem.inputAssetAmount')}
					/>
				</Form.Item>
				{isPricePerUnitRequired && <Form.Item
					name="purchasePricePerUnit"
					className={styles.inputControl}
				>
					<InputNumber
						style={{ width: '100%' }}
						min={DEFAULT_ZERO}
						max={Number.POSITIVE_INFINITY}
						placeholder={t('brokerItem.inputAssetPurchasePricePerUnit')}
					/>
				</Form.Item>}
				<Form.Item
					name="assetCurrency"
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

FormAddAsset.propTypes = {
	addAssetCaption: PropTypes.string.isRequired,
	submitHandler: PropTypes.func.isRequired,
};

export default FormAddAsset;
