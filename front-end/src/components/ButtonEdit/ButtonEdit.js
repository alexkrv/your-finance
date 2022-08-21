import React from 'react';
import PropTypes from 'prop-types';
import { EditOutlined } from '@ant-design/icons';
import { Popconfirm, message, } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './ButtonEdit.module.scss';

const ButtonEdit = ({
	onConfirm,
	title,
	confirmationOkText,
	confirmationCancelText,
	confirmationPlacement,
	iconClassName,
	afterActionText,
}) => {
	const { t, } = useTranslation();
	const handleOkClick = () => {
		onConfirm?.();
		message.success(afterActionText || t('common.removed'));
	};

	return (
		<div>
			<Popconfirm
				confirmationPlacement={confirmationPlacement}
				title={title}
				onConfirm={handleOkClick}
				okText={confirmationOkText}
				cancelText={confirmationCancelText}
			>
				<EditOutlined className={clsx(styles.icon, iconClassName)} />
			</Popconfirm>
		</div>
	);
};

ButtonEdit.propTypes = {
	onConfirm: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	confirmationOkText: PropTypes.string.isRequired,
	confirmationCancelText: PropTypes.string.isRequired,
	confirmationPlacement: PropTypes.string.isRequired,
	iconClassName: PropTypes.string,
	afterActionText: PropTypes.string,
};

export default ButtonEdit;
