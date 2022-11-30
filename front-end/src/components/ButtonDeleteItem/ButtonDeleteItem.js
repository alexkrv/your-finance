import React from 'react';
import PropTypes from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, message, } from 'antd';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import styles from './ButtonDeleteItem.module.scss';

const ButtonDeleteItem = ({
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
		<Popconfirm
			confirmationPlacement={confirmationPlacement}
			title={title}
			onConfirm={handleOkClick}
			okText={confirmationOkText}
			cancelText={confirmationCancelText}
		>
			<DeleteOutlined className={clsx(styles.icon, iconClassName)} />
		</Popconfirm>
	);
};

ButtonDeleteItem.propTypes = {
	onConfirm: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	confirmationOkText: PropTypes.string.isRequired,
	confirmationCancelText: PropTypes.string.isRequired,
	confirmationPlacement: PropTypes.string.isRequired,
	iconClassName: PropTypes.string,
	afterActionText: PropTypes.string,
};

export default ButtonDeleteItem;