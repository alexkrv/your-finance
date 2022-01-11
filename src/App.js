import { Button, } from 'antd';
import {
	EyeOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { useTranslation, } from 'react-i18next';

import './App.css';

import HeaderMenu from './features/headerMenu/HeaderMenu';

const App = () => {
	const { t, } = useTranslation();

	return (
		<div className="App">
			<HeaderMenu/>
			<div className="App-header">
				<Button type="text" shape="circle" icon={<PlusOutlined />} size='large' />
				<Button type="text" shape="circle" icon={<EyeOutlined />} size='large' />
				{t('description.part1')}
			</div>
		</div>
	);
};

export default App;
