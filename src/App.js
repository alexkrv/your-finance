import { Switch, Button, } from 'antd';
import {
	EyeOutlined,
	FlagOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { useTranslation, } from 'react-i18next';

import './App.css';

const lngs ={
	en: { nativeName: 'English' },
	ru: { nativeName: 'Russian' }
};

function App() {
	const { t, i18n } = useTranslation();
    
	return (
		
		<div className="App">
			<header className="App-header">
				<Switch />
				<Button type="text" shape="circle" icon={<PlusOutlined />} size='large' />
				<Button type="text" shape="circle" icon={<EyeOutlined />} size='large' />
				<Button type="text" shape="circle" icon={<FlagOutlined />} size='large' />
				{t('description.part1')}
			</header>
		</div>
	);
}

export default App;
