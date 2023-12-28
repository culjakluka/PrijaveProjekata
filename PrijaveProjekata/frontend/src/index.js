import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirstDataContextProvider } from './context/FirstDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirstDataContextProvider>
      <App />
    </FirstDataContextProvider>
  </React.StrictMode>
);
