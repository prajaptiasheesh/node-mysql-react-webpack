import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
      <Toaster />
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
