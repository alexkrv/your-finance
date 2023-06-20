import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditOutlined } from '@ant-design/icons';
import { message, Modal, } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './ButtonEdit.module.scss';

const ButtonEdit = ({
	onConfirm,
	iconClassName,
	afterActionText,
	editItemFormElement
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const { t, } = useTranslation();
	const handleOkClick = () => {
		onConfirm?.();
		message.success(afterActionText || t('common.done'));
		setIsVisible(false);
	};

	return (
		<>
			<div onClick={() => setIsVisible(!isVisible)} className={styles.button}>
				<EditOutlined className={clsx(styles.icon, iconClassName)} />
			</div>
			<Modal
				width={'fit-content'}
				open={isVisible}
				onOk={handleOkClick}
				onCancel={() => setIsVisible(false)}
				closable={false}
			>
				{editItemFormElement}
			</Modal>
		</>
	);
};

ButtonEdit.propTypes = {
	onConfirm: PropTypes.func,
	title: PropTypes.string.isRequired,
	iconClassName: PropTypes.string,
	afterActionText: PropTypes.string,
};

export default ButtonEdit;
