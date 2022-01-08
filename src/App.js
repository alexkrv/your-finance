import { Switch, Button, } from 'antd';
import {
    EyeOutlined,
    FlagOutlined,
    PlusOutlined,
} from '@ant-design/icons';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Switch />
          <Button type="text" shape="circle" icon={<PlusOutlined />} size='large' />
          <Button type="text" shape="circle" icon={<EyeOutlined />} size='large' />
          <Button type="text" shape="circle" icon={<FlagOutlined />} size='large' />
      </header>
    </div>
  );
}

export default App;
