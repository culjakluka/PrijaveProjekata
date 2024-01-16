import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirstDataContextProvider } from './context/FirstDataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FirstDataContextProvider>
        <App />
      </FirstDataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
