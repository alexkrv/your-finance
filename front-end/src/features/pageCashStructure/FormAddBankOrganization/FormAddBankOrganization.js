import { DEFAULT_EMPTY_STRING } from 'constants/default-values';

import React, { useRef, useState, } from 'react';
import { Button, Form, Input, Space, message, } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { addBankOrganization } from '../PageCashStructureSlice';

const FormAddBankOrganization = () => {
	const [form] = Form.useForm();
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const formRef = useRef();

	const initialValues = {
		bankName: DEFAULT_EMPTY_STRING,
	};
	const onFinish = (values) => {
		message.success(t('bankItem.bankAdded'));
		dispatch(addBankOrganization(values.bankName));
		formRef.current.resetFields(['bankName']);
		setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { bankName }) => setIsSaveButtonDisabled(!Boolean(bankName));

	return (
		<Form
			form={form}
			ref={formRef}
			onFinish={onFinish}
			onValuesChange={onValuesChange}
			initialValues={initialValues}
			layout="vertical"
			wrapperCol={{ span: 100 }}
		>
			<Form.Item
				name="bankName"
				rules={[
					{
						required: true,
						message: t('bankItem.errorBankNameRequired')
					},
				]}
			>
				<Input placeholder={t('bankItem.inputBankName')}/>
			</Form.Item>
			<Space size='small'>
				<Button disabled={isSaveButtonDisabled} type="primary" shape="round" size='medium' htmlType="submit">
					{t('common.save')}
				</Button>
			</Space>
		</Form>
	);
};

export default FormAddBankOrganization;