export default function ProductAnalysisTable({
  title = 'Specification & Quality Analysis',
  subtitle = 'Standard laboratory testing parameters for export-grade certified products',
  analysis = [],
  storage,
}) {
  return (
    <div className="max-w-4xl mx-auto text-left mt-8">
      <div className="mb-4">
        <h3 className="text-xl font-black font-heading text-slate-900">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#dff0d8] border-b border-slate-300">
              <th className="p-3 font-bold text-slate-900 text-sm">Characteristic / Test</th>
              <th className="p-3 font-bold text-slate-900 text-sm w-44 text-right sm:text-left">Specification</th>
            </tr>
          </thead>
          <tbody>
            {analysis.map((row, idx) => {
              let rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
              if (idx === 0) rowBg = 'bg-[#d9edf7]/70 font-semibold'
              if (idx === 3) rowBg = 'bg-[#dff0d8]/70'

              return (
                <tr key={row.characteristic} className={`${rowBg} border-b border-slate-200 last:border-b-0 hover:bg-slate-100/70 transition-colors`}>
                  <td className="p-2.5 text-slate-800 font-medium">
                    {row.characteristic}
                  </td>
                  <td className="p-2.5 font-bold text-slate-900 font-mono text-right sm:text-left">
                    {row.requirement}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Storage Instructions Note */}
      {storage && (
        <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium">
          <strong>Storage:</strong> {storage}
        </div>
      )}
    </div>
  )
}
