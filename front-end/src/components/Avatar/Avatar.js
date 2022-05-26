import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as AvatarAntd } from 'antd';

const Avatar = ({ placeholder }) => {
	return (
		<AvatarAntd
			size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 44 }}
			icon={placeholder}
			style={{ background: 'gray', cursor: 'pointer' }}
		/>
	);
};

Avatar.propTypes = {
	placeholder: PropTypes.node
};

export default Avatar;