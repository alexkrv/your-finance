import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Upload, } from 'antd';
import { UploadOutlined, } from '@ant-design/icons';

import styles from './AvatarWithUpload.scss';

const AvatarWithUpload = ({ imageUrl, actionUrl }) => {
	const uploadButton = <div className={styles.uploadBtnContainer}>
		<Avatar
			size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 }}
			icon={<UploadOutlined/>}
			style={{ background: 'gray', cursor: 'pointer' }}
		/>
	</div>;
	const handleChange = () => {};

	return (
		<>
			<Upload
				name="avatar"
				listType="picture"
				showUploadList={false}
				action={actionUrl}
				// beforeUpload={beforeUpload}
				onChange={handleChange}
			>
				{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
			</Upload>
		</>
	);
};

AvatarWithUpload.propTypes = {

};

export default AvatarWithUpload;