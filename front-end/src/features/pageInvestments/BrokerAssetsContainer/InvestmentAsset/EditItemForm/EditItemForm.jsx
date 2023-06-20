import { DEFAULT_EMPTY_STRING, DEFAULT_ZERO } from '@root/constants/default-values';

import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Button, Space, Typography, Switch, } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import SelectCurrency from '@root/features/selectCurrency/SelectCurrency';

import styles from './EditItemForm.module.scss';

const EditItemForm = ({
	assetName,
	submitHandler,
}) => {
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const [isBuyMode, setIsBuyMode] = useState(true);
	const { baseCurrencyKey } = useSelector(state => state.currencies);
	const [form] = Form.useForm();
	const formRef = useRef();
	const { t, } = useTranslation();

	const initialValues = {
		amount: DEFAULT_EMPTY_STRING,
		purchasePricePerUnit: DEFAULT_ZERO,
		currency: baseCurrencyKey
	};
	const onFinish = data => {
		submitHandler({ ...data, assetName, isBuyMode });
		formRef.current.resetFields(['amount', 'purchasePricePerUnit']);
		setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { amount }) => setIsSaveButtonDisabled(!Boolean(amount));

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
				{`${isBuyMode ? t('common.buy') : t('common.sell')} ${assetName}`}
			</Typography.Title>
			<Switch
				defaultChecked
				checkedChildren={t('common.buy')}
				unCheckedChildren={t('common.sell')}
				onChange={ () => setIsBuyMode(!isBuyMode)}
			/>
			<Space size='small' align='start' direction='vertical' className={styles.inputControls}>
				<Form.Item
					name="amount"
					className={styles.inputControl}
				>
					<InputNumber
						style={{ width: '100%' }}
						min={DEFAULT_ZERO}
						max={Number.POSITIVE_INFINITY}
						placeholder={t('brokerItem.inputAssetAmount')}
					/>
				</Form.Item>
				{isBuyMode && <>
					<Form.Item
						name="currency"
						className={styles.inputControl}
					>
						<SelectCurrency/>
					</Form.Item>
					<Form.Item
						name="purchasePricePerUnit"
						className={styles.inputControl}
					>
						<InputNumber
							style={{ width: '100%' }}
							min={DEFAULT_ZERO}
							max={Number.POSITIVE_INFINITY}
							placeholder={t('brokerItem.inputAssetPurchasePricePerUnit')}
						/>
					</Form.Item>
				</>}
				<Space size='small'>
					<Button disabled={isSaveButtonDisabled} type="primary" shape="round" size='medium' htmlType="submit" className={styles.button}>
						{t('common.save')}
					</Button>
				</Space>
			</Space>
		</Form>
	);
};

EditItemForm.propTypes = {
	assetName: PropTypes.string.isRequired,
	submitHandler: PropTypes.func.isRequired,
};

export default EditItemForm;
