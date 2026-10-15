/**
 * src/dashboard/products/components/ProductSpecsEditor.jsx
 * ─────────────────────────────────────────────────────────────
 * Interactive Chemical & Physical Specifications Editor for
 * Exim India products (Lab Assay, Lead, Arsenic limits, etc.).
 */

import { STANDARD_ANALYSIS_TEMPLATE } from '../productStructure'

export default function ProductSpecsEditor({ specifications = [], onChange = () => {} }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...specifications]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    onChange(updated)
  }

  const handleAddRow = () => {
    onChange([
      ...specifications,
      { characteristic: '', requirement: '' },
    ])
  }

  const handleRemoveRow = (index) => {
    const updated = specifications.filter((_, i) => i !== index)
    onChange(updated)
  }

  const handleLoadStandardTemplate = () => {
    onChange([...STANDARD_ANALYSIS_TEMPLATE])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Chemical Analysis & Test Specifications
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Certificate of Analysis (COA) test parameters required for export buyers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadStandardTemplate}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0a3622] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Load Standard Food Specs
          </button>
          <button
            type="button"
            onClick={handleAddRow}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Parameter
          </button>
        </div>
      </div>

      {specifications.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
          <p className="text-xs text-slate-500 mb-2">No chemical specifications added yet.</p>
          <button
            type="button"
            onClick={handleLoadStandardTemplate}
            className="text-xs font-bold text-[#0a3622] hover:underline cursor-pointer"
          >
            Click here to load standard export analysis parameters
          </button>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-8 text-center">#</th>
                  <th className="py-2.5 px-3 min-w-[220px]">Characteristic / Test Parameter</th>
                  <th className="py-2.5 px-3 min-w-[160px]">Specification Requirement (Min/Max)</th>
                  <th className="py-2.5 px-3 w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {specifications.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 px-3 text-slate-400 text-center font-mono text-[11px]">
                      {index + 1}
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.characteristic}
                        onChange={(e) => handleItemChange(index, 'characteristic', e.target.value)}
                        placeholder="e.g. Total color/Assay, percent by Mass, min."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] text-xs outline-none transition-colors"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.requirement}
                        onChange={(e) => handleItemChange(index, 'requirement', e.target.value)}
                        placeholder="e.g. 85.00% or 10.00 ppm Max"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#0a3622] focus:ring-1 focus:ring-[#0a3622] text-xs outline-none transition-colors"
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(index)}
                        className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove parameter"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
