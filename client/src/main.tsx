import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="bg-[#F5F5F5] min-h-screen poppins-regular text-tertiary"><App /></div>
  </StrictMode>,
)
