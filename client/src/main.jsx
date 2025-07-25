import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
)
