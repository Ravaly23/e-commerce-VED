import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Dashboard from './Pages/Dashboard'

import AddArticle from './Pages/AddArticle'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
