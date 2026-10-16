import { useState, useEffect, useRef, useMemo } from 'react'

/**
 * Searchable dropdown.
 * options: [{ value, label }]; value: the selected option's value ('' = none).
 * `placeholder` doubles as the label of the "no selection" row.
 */
export default function SearchSelect({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  className = '',
  clearable = true,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const rootRef = useRef(null)
  const inputRef = useRef(null)

  const selected = options.find((o) => String(o.value) === String(value))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options
  }, [options, query])

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const openMenu = () => {
    setQuery('')
    setHighlight(0)
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const choose = (v) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlight]) choose(filtered[highlight].value)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openMenu())}
        className="w-full flex items-center justify-between gap-2 text-sm px-3 py-2 rounded-xl border border-slate-300 bg-white text-left focus:outline-none focus:border-[#0a3622] cursor-pointer"
      >
        <span className={`truncate ${selected ? 'text-slate-900' : 'text-slate-400'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-40 mt-1 w-full min-w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setHighlight(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Type to search…"
            className="w-full text-sm px-3 py-2 border-b border-slate-100 focus:outline-none"
          />
          <ul className="max-h-60 overflow-y-auto py-1">
            {clearable && !query && (
              <li>
                <button
                  type="button"
                  onClick={() => choose('')}
                  className="w-full text-left text-sm px-3 py-1.5 text-slate-400 hover:bg-slate-50 cursor-pointer"
                >
                  {placeholder}
                </button>
              </li>
            )}
            {filtered.length === 0 && <li className="px-3 py-2 text-xs text-slate-400">No matches</li>}
            {filtered.map((o, i) => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => choose(o.value)}
                  onMouseEnter={() => setHighlight(i)}
                  className={`w-full text-left text-sm px-3 py-1.5 cursor-pointer ${
                    i === highlight ? 'bg-emerald-50' : ''
                  } ${String(o.value) === String(value) ? 'font-bold text-[#0a3622]' : 'text-slate-800'}`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
