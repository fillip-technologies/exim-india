import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import './index.css'
import App from './App.jsx'

function MainLayout() {
  const location = useLocation()
  const isAuthOrAdmin = 
    location.pathname.startsWith('/login') || 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/dashboard')

  if (isAuthOrAdmin) {
    return <App />
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex-1">
        <App />
      </main>
      <Footer />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </StrictMode>,
)
