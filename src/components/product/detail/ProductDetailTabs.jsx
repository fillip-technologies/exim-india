import { useNavigate } from 'react-router-dom'

export default function ProductDetailTabs({ products, currentId, baseUrl }) {
  const navigate = useNavigate()

  return (
    <div className="mb-8 border-b border-slate-200 overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-1.5 w-max">
        {products.map((item) => {
          const isActive = item.id === currentId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(`${baseUrl}/${item.id}`)}
              className={`px-3.5 py-1.5 text-xs font-bold transition-all rounded-t-lg border-t border-x cursor-pointer ${
                isActive
                  ? 'bg-[#00a8cc] text-white border-[#00a8cc] shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
