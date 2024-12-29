import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/heebo';
import App from './App';
import { UserProvider } from './contexts/userContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProfileProvider } from './contexts/profileContext';

ReactDOM.render(
  <GoogleOAuthProvider clientId='741551853471-kt4abhesdo765k380sf8guh3ani1tfd7.apps.googleusercontent.com'>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <UserProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </UserProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
  ,
  document.getElementById('root')
);
