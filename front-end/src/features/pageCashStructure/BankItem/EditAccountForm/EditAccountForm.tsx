import React, { useRef, } from 'react';
import { Button, Form, Input, InputNumber, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import type { FormInstance } from 'antd/es/form';

import { useEditBankAccountMutation } from '@root/api';
import { DEFAULT_EMPTY_STRING, DEFAULT_ZERO, } from '@root/constants/default-values';
import type { AccountItemType } from '@root/types';

import styles from './EditAccountForm.module.scss';

export const EditAccountForm = ({ bankId, account }: AccountItemType) => {
	const [editBankAccount] = useEditBankAccountMutation();
	const [form] = Form.useForm();
	const formRef = useRef<FormInstance | null>(null);
	const { t, } = useTranslation();
	const accountValue = Form.useWatch('accountValue', form);
	const accountName = Form.useWatch('accountName', form);
	const initialValues = {
		bankId: DEFAULT_EMPTY_STRING,
		accountId: DEFAULT_EMPTY_STRING,
		accountName: account.name,
		accountValue: account.value,
	};
	const onFinish = ({ accountName, accountValue }: {accountName: string, accountValue: number}) => {
		editBankAccount({ bankId, accountName, accountValue, accountId: account._id });
		formRef.current?.resetFields(['accountName', 'accountValue']);
	};

	return (
		<Form
			form={form}
			ref={formRef}
			onFinish={onFinish}
			initialValues={initialValues}
			layout="vertical"
			className={styles.form}
			wrapperCol={{ span: 100 }}
		>
			<Typography.Title
				level={2}
				className={styles.caption}
			>
				{t('bankItem.editAccount')}&nbsp;{account.name}&nbsp;({account.currencyId})
			</Typography.Title>
			<Space size="small" align="start" direction="vertical" className={styles.inputControls}>
				<Form.Item
					name="accountName"
					className={styles.inputControl}
				>
					<Input
						style={{ width: '100%' }}
						placeholder={t('bankItem.editAccountName')}
					/>
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
				<Space size="small">
					<Button disabled={!accountValue && !accountName} type="primary" shape="round" size="middle" htmlType="submit"
						className={styles.button}>
						{t('common.save')}
					</Button>
				</Space>
			</Space>
		</Form>
	);
};