import { ROUTE_HOME, ROUTE_REGISTRATION } from 'constants/routes';

import React from 'react';
import { Input, Button, Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined, LockOutlined, } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, } from 'react-router-dom';

import TextStyler from '../../components/TextStyler/TextStyler';

import styles from './PageLogin.module.scss';

import { login, } from './PageLoginSlice';

const PageLogin = () => {
	const { t, } = useTranslation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const navigatedFrom = location.state?.from?.pathname || ROUTE_HOME;
	const goToRegistration = () => navigate(ROUTE_REGISTRATION, { state: navigatedFrom });
	const forgetPassword = () => {/*TODO*/};

	const onFinish = (values) => {
		console.log('Received values of form: ', values);
		dispatch(login(/*TODO*/));
		navigate(navigatedFrom, { replace: true });
	};

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<TextStyler className={styles.caption}>
				{t('auth.title')}
			</TextStyler>
			<Form.Item
				name="username"
				rules={[{ required: true, message: t('auth.errorInputLogin') }]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('auth.placeholderLogin')} />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: t('auth.errorInputPassword') }]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder={t('auth.placeholderPassword')}
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>
						<TextStyler>
							{t('auth.rememberMe')}
						</TextStyler>
					</Checkbox>
				</Form.Item>
				<Button type="text" size='middle' onClick={forgetPassword}>
					<TextStyler>
						{t('auth.forgetPassword')}
					</TextStyler>
				</Button>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					{t('auth.login')}
				</Button>
				<Button type="text" size='middle' onClick={goToRegistration} className={styles.register}>
					<TextStyler>
						{t('auth.register')}
					</TextStyler>
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PageLogin;