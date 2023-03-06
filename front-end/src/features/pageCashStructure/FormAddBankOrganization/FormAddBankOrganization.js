import { DEFAULT_EMPTY_STRING } from 'constants/default-values';

import React, { useRef, } from 'react';
import { Button, Form, Input, Space, message, } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAddBankOrganizationMutation } from '../../../api';

const FormAddBankOrganization = () => {
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const formRef = useRef();
	const [addBankOrganization] = useAddBankOrganizationMutation();
	const bankName = Form.useWatch('name', form);

	const initialValues = {
		name: DEFAULT_EMPTY_STRING,
	};
	const onFinish = (values) => {
		message.success(t('bankItem.bankAdded'));
		addBankOrganization(values);
		formRef.current.resetFields(['name']);
	};

	return (
		<Form
			form={form}
			ref={formRef}
			onFinish={onFinish}
			initialValues={initialValues}
			layout="vertical"
			wrapperCol={{ span: 100 }}
		>
			<Form.Item
				name="name"
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
				<Button disabled={!bankName} type="primary" shape="round" size='medium' htmlType="submit">
					{t('common.save')}
				</Button>
			</Space>
		</Form>
	);
};

export default FormAddBankOrganization;