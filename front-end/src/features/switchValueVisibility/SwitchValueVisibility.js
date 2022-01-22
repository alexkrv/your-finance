import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SwitchValueVisibility.module.scss';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toggleVisibility } from './SwitchValueVisibilitySlice';
import { useTranslation } from 'react-i18next';

const SwitchValueVisibility = () => {
	const { t, } = useTranslation();
	const isVisible = useSelector(state => state.valueVisibility.isVisible);
	const dispatch = useDispatch();
	const handleChange = () => dispatch(toggleVisibility(!isVisible));

	return (
		<div onClick={handleChange} className={styles.icon}>
			{isVisible ?
				<><EyeInvisibleOutlined/>&nbsp;{t('header.hide')}</>
				:
				<><EyeOutlined/>&nbsp;{t('header.show')}</>
			}
		</div>
	);
};

export default SwitchValueVisibility;