import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, } from 'antd';
import { UploadOutlined, } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

import Avatar from '../Avatar/Avatar';

const UploadButton = ({ actionUrl, avatar }) => {
	const [avatarBase64, setAvatarBase64] = useState(avatar);
	const handleChange = data => {
		if(data?.file.response) {
			setAvatarBase64(data?.file.response);
		}
	};

	return (
		<ImgCrop rotate>
			<Upload
				name="avatar"
				listType="picture"
				showUploadList={false}
				action={actionUrl}
				onChange={handleChange}
			>
				<Avatar placeholder={avatarBase64 ?
					<img src={avatarBase64} alt="avatar" style={{ width: '100%' }} /> : <UploadOutlined/>
				}/>
			</Upload>
		</ImgCrop>
	);
};

UploadButton.propTypes = {
	actionUrl: PropTypes.string.isRequired,
	avatar: PropTypes.string
};

export default UploadButton;