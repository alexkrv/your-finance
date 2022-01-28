import React from 'react';
import styles from '../FormAddCashCategory/FormAddCashCategory.module.scss';
import { Form, Input } from 'antd';

const FormAddBankOrganization = props => {
	return (
		<div>
			<Form.Item
				name="bankName"
				rules={[
					{
						required: true,
						message: t('cashCategories.errorBankNameRequired')
					},
				]}
				className={styles.inputControl}
			>
				<Input placeholder={t('cashCategories.inputBankName')}/>
			</Form.Item>
		</div>
	);
};

export default FormAddBankOrganization;