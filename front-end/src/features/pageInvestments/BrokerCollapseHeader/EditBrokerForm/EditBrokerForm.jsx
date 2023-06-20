import React from 'react';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEditBrokerNameMutation } from '@root/api';

import { DEFAULT_EMPTY_STRING, } from '@root/constants/default-values';
import styles from '../../BrokerAssetsContainer/InvestmentAsset/EditItemForm/EditItemForm.module.scss';

const EditBrokerForm = ({ brokerId }) => {
	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
	const [editBroker] = useEditBrokerNameMutation();
	const [form] = Form.useForm();
	const formRef = useRef();
	const { t, } = useTranslation();

	const initialValues = {
		brokerName: DEFAULT_EMPTY_STRING,
	};
	const onFinish = ({ brokerName }) => {
		editBroker({ brokerId, brokerName });
		formRef.current.resetFields(['brokerName']);
		setIsSaveButtonDisabled(true);
	};
	const onValuesChange = (changedValues, { brokerName }) => setIsSaveButtonDisabled(!Boolean(brokerName));

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
				className={styles.caption}
			>
				{t('broker.editBrokerName')}
			</Typography.Title>
			<Space size="small" align="start" direction="vertical" className={styles.inputControls}>
				<Form.Item
					name="brokerName"
					className={styles.inputControl}
				>
					<Input
						style={{ width: '100%' }}
						placeholder={t('brokerItem.editBrokerName')}
					/>
				</Form.Item>
				<Space size="small">
					<Button disabled={isSaveButtonDisabled} type="primary" shape="round" size="medium" htmlType="submit"
						className={styles.button}>
						{t('common.save')}
					</Button>
				</Space>
			</Space>
		</Form>
	);
};

EditBrokerForm.propTypes = {
	brokerId: PropTypes.string.isRequired
};

export default EditBrokerForm;