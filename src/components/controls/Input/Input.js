import React from 'react';
import PropTypes from 'prop-types';
import { Input as AntdInput } from 'antd';

import styles from './Input.module.scss';

export const Input = (props) => {
	return (
		<AntdInput
			{...props}
		/>
	);
};

Input.propTypes = {

};
