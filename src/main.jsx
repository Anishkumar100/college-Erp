import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';




createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    
  </StrictMode>,
)
