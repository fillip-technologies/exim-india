/** Order fulfilment workflow (differs from the contact inbox statuses). */
export const ORDER_STATUSES = ['new', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export const ORDER_STATUS_STYLES = {
  new:        'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  confirmed:  'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  processing: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  shipped:    'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  delivered:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  cancelled:  'bg-red-50 text-red-700 ring-1 ring-red-200',
}

export const ORDER_STATUS_ICONS = {
  new:        '🔵',
  confirmed:  '👍',
  processing: '⚙️',
  shipped:    '🚚',
  delivered:  '✅',
  cancelled:  '✖️',
}
