import React from 'react';
import Home from './Home/index';
import 'antd/dist/reset.css'; // Importação do CSS do Ant Design

const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;