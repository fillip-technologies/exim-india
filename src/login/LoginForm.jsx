import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import { login, ApiError } from '../api'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    try {
      // Calls POST /api/admin/login via the API layer
      // Token is saved inside login() automatically
      await login(email.trim(), password)
      navigate('/dashboard')
    } catch (err) {
      if (err instanceof ApiError) {
        // Laravel validation errors come in err.errors.email[0]
        const fieldError =
          err.errors?.email?.[0] ||
          err.errors?.password?.[0]

        setError(fieldError || err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      {/* Logo & Header */}
      <div className="text-center mb-8">
        <img
          src={logoImg}
          alt="Exim India Logo"
          className="h-10 mx-auto mb-4 object-contain"
        />
        <h1 className="text-2xl font-bold text-slate-800">
          Admin Login
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter your email and password to continue
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@eximindiacorporation.com"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors disabled:bg-slate-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] transition-colors disabled:bg-slate-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#0a3622] hover:bg-[#15803d] text-white font-medium text-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
