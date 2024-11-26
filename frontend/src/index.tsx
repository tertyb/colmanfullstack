import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/heebo';
import App from './App';
import { UserProvider } from './contexts/userContext';

ReactDOM.render(
  <BrowserRouter>
  <UserProvider>
    <App />
  </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
