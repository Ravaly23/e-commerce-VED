import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Dashboard from './Pages/Dashboard'
// import Accueil from './Pages/Accueil.tsx'
// import MenuLateraux from './components/MenuLateraux'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
