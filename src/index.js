import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context from './store/Context';
import UserContext from './store/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContext>
    <Context>
    <App />
    </Context>
    </UserContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

