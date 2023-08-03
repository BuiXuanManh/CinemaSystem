import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

export let isLoggedIn = false;
export function setLoggedIn(value) {
  isLoggedIn = value;
}

const tokenCheck = Cookies.get('auth_token');
// Cookies.remove('auth_token')

if(tokenCheck){
  isLoggedIn = true;
}
else{
  isLoggedIn = false;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


