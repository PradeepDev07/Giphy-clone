import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GifProvider from './context/GifContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GifProvider>
    <App />
    </GifProvider>
  
  </StrictMode>,
)
