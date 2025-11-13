import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import StoreContextProvider from './context/StoreContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreContextProvider>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <App />
      </GoogleOAuthProvider>
    </StoreContextProvider>  
  </StrictMode>
);


