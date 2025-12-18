import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MatnaApp from './MatnaApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MatnaApp />
  </StrictMode>,
)
