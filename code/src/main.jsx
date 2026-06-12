import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './figma.css'
import './figma-uc5a.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
