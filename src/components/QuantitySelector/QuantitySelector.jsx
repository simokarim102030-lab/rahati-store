import { Minus, Plus } from 'lucide-react'
import './QuantitySelector.css'

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="qty-selector">
      <button
        type="button"
        className="qty-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="تقليل"
      >
        <Minus size={16} />
      </button>
      <span className="qty-value">{value}</span>
      <button
        type="button"
        className="qty-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="زيادة"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
