import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ReservationContextProvider} from './context/reservationContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <ReservationContextProvider>
        <App />
      </ReservationContextProvider>
    
  </React.StrictMode>
);

