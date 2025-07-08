import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { CustomScrollbar } from './components/utils/customScrollbar/CustomScrollbar.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <CustomScrollbar/>
    </BrowserRouter>
  </React.StrictMode>,
)
