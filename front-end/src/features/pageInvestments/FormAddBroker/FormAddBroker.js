import { DEFAULT_EMPTY_STRING } from 'constants/default-values';

import React, { useRef, useState, } from 'react';
import { Button, Form, Input, Space, message, } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAddBrokerMutation } from '../../../api';

const FormAddBroker = () => {
	const [form] = Form.useForm();
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const { t } = useTranslation();
	const formRef = useRef();
	const [addBroker] = useAddBrokerMutation();

	const initialValues = {
		name: DEFAULT_EMPTY_STRING,
	};
	const onFinish = (values) => {
		message.success(t('brokerItem.brokerAdded'));
		addBroker(values);
		formRef.current.resetFields(['name']);
		setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { name }) => setIsSaveButtonDisabled(!Boolean(name));

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
				name="name"
				rules={[
					{
						required: true,
						message: t('brokerItem.errorBrokerNameRequired')
					},
				]}
			>
				<Input placeholder={t('brokerItem.inputBrokerName')}/>
			</Form.Item>
			<Space size='small'>
				<Button disabled={isSaveButtonDisabled} type="primary" shape="round" size='medium' htmlType="submit">
					{t('common.save')}
				</Button>
			</Space>
		</Form>
	);
};

export default FormAddBroker;