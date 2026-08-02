import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { WorkshopProvider } from './context/WorkshopContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WorkshopProvider>
          <App />
        </WorkshopProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
