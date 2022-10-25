import React, { Component } from 'react';
import Login from './components/login';
import './App.scss';
import CustomRoutes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <CustomRoutes />
        </div>
      </div>
    );
  }
}

export default App;
