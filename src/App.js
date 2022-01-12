import { Button, } from 'antd';
import {
	EyeOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { useTranslation, } from 'react-i18next';
import { useSelector, } from 'react-redux';

import 'antd/dist/antd.css';
import styles from './App.module.css';

import HeaderMenu from './features/headerMenu/HeaderMenu';

const App = () => {
	const { t, } = useTranslation();
	const theme = useSelector( state => state.theme.value);

	return (
		<div className={styles.app} data-theme={theme}>
			<HeaderMenu/>
			<div className={styles.appHeader}>
				<Button type="text" shape="circle" icon={<PlusOutlined />} size='large' />
				<Button type="text" shape="circle" icon={<EyeOutlined />} size='large' />
				{t('description.part1')}
			</div>
		</div>
	);
};

export default App;
