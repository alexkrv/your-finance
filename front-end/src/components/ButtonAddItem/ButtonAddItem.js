import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusCircleOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { Modal } from 'antd';

import styles from './ButtonAddItem.module.scss';

const ButtonAddItem = ({ text, size, addItemFormElement, className }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const showModal = () => setIsModalVisible(true);
	const handleOk = () => setIsModalVisible(false);
	const handleCancel = () => setIsModalVisible(false);

	return (
		<>
			<div className={clsx(styles.container, className)} onClick={showModal}>
				<PlusCircleOutlined className={clsx(styles.icon, styles[size])}/>
				{text}
			</div>
			<Modal width={'fit-content'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} closable={false}>
				{addItemFormElement}
			</Modal>
		</>
	);
};

ButtonAddItem.propTypes = {
	text: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
	addItemFormElement: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default ButtonAddItem;