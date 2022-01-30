import React from 'react';
import PropTypes from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import clsx from 'clsx';

import styles from './ButtonDeleteItem.module.scss';

const ButtonDeleteItem = ({ onConfirm, title, confirmationOkText, confirmationCancelText, confirmationPlacement, iconClassName, }) => {
	return (
		<div>
			<Popconfirm
				confirmationPlacement={confirmationPlacement}
				title={title}
				onConfirm={onConfirm}
				okText={confirmationOkText}
				cancelText={confirmationCancelText}
			>
				<DeleteOutlined className={clsx(styles.icon, iconClassName)} />
			</Popconfirm>
		</div>
	);
};

ButtonDeleteItem.propTypes = {
	onConfirm: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	confirmationOkText: PropTypes.string.isRequired,
	confirmationCancelText: PropTypes.string.isRequired,
	confirmationPlacement: PropTypes.string.isRequired,
	iconClassName: PropTypes.string,
};

export default ButtonDeleteItem;