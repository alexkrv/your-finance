import React from 'react';
import { Input, Button, } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeTwoTone, EyeInvisibleOutlined, } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { useNavigate, useLocation, } from 'react-router-dom';

import styles from './PageLogin.module.scss';

import { login, } from './PageLoginSlice';
import { ROUTE_HOME, ROUTE_REGISTRATION } from '../../constants/routes';

const PageLogin = () => {
	const { t, } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const navigatedFrom = location.state?.from?.pathname || ROUTE_HOME;
	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
		},
		onSubmit: (values) => {
			dispatch(login());
			navigate(navigatedFrom, { replace: true });
		},
	});
	const goToRegistration = () => navigate(ROUTE_REGISTRATION, { state: navigatedFrom });

	return (
		<div className={styles.container}>
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.caption}>{t('auth.title')}</div>
				<Input
					id="login"
					name="login"
					value={formik.values.login}
					onChange={formik.handleChange}
					placeholder={t('auth.placeholderLogin')}
					className={styles.input}
				/>
				<Input.Password
					id="password"
					name="password"
					iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					value={formik.values.password}
					onChange={formik.handleChange}
					placeholder={t('auth.placeholderPassword')}
					className={styles.input}
				/>
				<Button
					htmlType="submit"
					type="primary"
					size='middle'
					className={styles.login}
					loading={false/*TODO while submitting*/}
				>
					{t('auth.login')}
				</Button>
				<Button type="text" size='middle' onClick={goToRegistration} className={styles.register}>
					{t('auth.register')}
				</Button>
			</form>
		</div>
	);
};

export default PageLogin;