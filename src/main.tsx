import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'
import './styles/darkmode.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider options={{ defaultMode: 'auto' }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
