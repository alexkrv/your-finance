import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useLocalStorage from 'use-local-storage';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import styles from './SwitchValueVisibility.module.scss';

import { toggleVisibility } from './SwitchValueVisibilitySlice';

const SwitchValueVisibility = () => {
	const [, setIsValueVisible] = useLocalStorage('isValueVisible', false);
	const { t, } = useTranslation();
	const isVisible = useSelector(state => state.valueVisibility.isVisible);
	const dispatch = useDispatch();
	const handleChange = () => {
		dispatch(toggleVisibility(!isVisible));
		setIsValueVisible(!isVisible);
	};

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