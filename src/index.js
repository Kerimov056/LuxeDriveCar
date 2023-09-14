import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './components/Redux/store'
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import MyStoreCheckout from './MyStoreCheckout';



const queryClinet = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClinet} >
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <GoogleOAuthProvider clientId="91997614652-1q2taif2sptoou1dahqsiripc4u5e0b6.apps.googleusercontent.com">
              <App />
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
