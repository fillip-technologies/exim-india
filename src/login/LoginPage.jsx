import React, { useEffect } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  useEffect(() => {
    document.title = 'Login | Exim India'
  }, [])

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  )
}
