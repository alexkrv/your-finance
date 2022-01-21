import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ValueVisibilitySwitcher.module.scss';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toggleVisibility } from './ValueVisibilitySwitcherSlice';
import { useTranslation } from 'react-i18next';

const ValueVisibilitySwitcher = () => {
	const { t, } = useTranslation();
	const isVisible = useSelector(state => state.valueVisibility.isVisible);
	const dispatch = useDispatch();
	const handleChange = () => dispatch(toggleVisibility(!isVisible));

	return (
		<div onClick={handleChange} className={styles.icon}>
			{isVisible ?
				<><EyeInvisibleOutlined/>{t('header.hide')}</>
				:
				<><EyeOutlined/>{t('header.show')}</>
			}
		</div>
	);
};

export default ValueVisibilitySwitcher;