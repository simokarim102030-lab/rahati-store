import { ShieldCheck, Truck, Banknote } from 'lucide-react'
import './TrustBar.css'

const ITEMS = [
  { icon: ShieldCheck, label: 'ضمان الجودة' },
  { icon: Truck, label: 'توصيل لجميع المدن' },
  { icon: Banknote, label: 'الدفع عند الاستلام' },
]

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-inner">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="trust-item">
            <div className="trust-circle">
              <Icon size={32} strokeWidth={1.2} />
            </div>
            <span className="trust-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
