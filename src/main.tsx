import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
