import { Switch, Button, } from 'antd';
import {
	EyeOutlined,
	FlagOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { useTranslation, } from 'react-i18next';

import './App.css';

function App() {
	const { t, i18n } = useTranslation();
	const changeLang = () => {
		const newLanguage = i18n.resolvedLanguage === 'en' ? 'ru' : 'en'
		
		i18n.changeLanguage(newLanguage)
	}

	return (
		<div className="App">
			<header className="App-header">
				<Switch />
				<Button type="text" shape="circle" icon={<PlusOutlined />} size='large' />
				<Button type="text" shape="circle" icon={<EyeOutlined />} size='large' />
				<Button type="secondary" icon={<FlagOutlined />} size='large' onClick={changeLang}>
					{t('i18n.lang')}
				</Button>
				{t('description.part1')}
			</header>
		</div>
	);
}

export default App;
