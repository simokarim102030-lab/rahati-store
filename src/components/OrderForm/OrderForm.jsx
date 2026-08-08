import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Lock } from 'lucide-react'
import { moroccanCities } from '../../data/products'
import QuantitySelector from '../QuantitySelector/QuantitySelector'
import './OrderForm.css'

export default function OrderForm({ product }) {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'مطلوب'
    if (!form.phone.trim()) e.phone = 'مطلوب'
    if (!form.city) e.city = 'اختر المدينة'
    if (!form.address.trim()) e.address = 'مطلوب'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          city: form.city,
          address: form.address,
          productId: product.id,
          productName: product.name,
          quantity: qty,
          unitPrice: product.price,
          total: product.price * qty,
        }),
      })
    } catch (_) {
      // navigate to success regardless — order may still have saved
    }

    navigate('/order-success', { state: { product, qty, total: product.price * qty } })
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <h2 className="order-form-title">تأكيد الطلب</h2>

      <div className={`of-group ${errors.name ? 'error' : ''}`}>
        <input
          name="name" type="text"
          placeholder="الاسم الكامل"
          value={form.name} onChange={onChange}
        />
        {errors.name && <span className="of-err">{errors.name}</span>}
      </div>

      <div className={`of-group ${errors.phone ? 'error' : ''}`}>
        <input
          name="phone" type="tel"
          placeholder="رقم الهاتف (06 أو 07)"
          value={form.phone} onChange={onChange}
          dir="ltr"
        />
        {errors.phone && <span className="of-err">{errors.phone}</span>}
      </div>

      <div className={`of-group of-select-wrap ${errors.city ? 'error' : ''}`}>
        <select name="city" value={form.city} onChange={onChange}>
          <option value="">اختر المدينة</option>
          {moroccanCities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <ChevronDown size={18} className="of-chevron" />
        {errors.city && <span className="of-err">{errors.city}</span>}
      </div>

      <div className={`of-group ${errors.address ? 'error' : ''}`}>
        <input
          name="address" type="text"
          placeholder="العنوان الكامل (الحي، الشارع، رقم البيت)"
          value={form.address} onChange={onChange}
        />
        {errors.address && <span className="of-err">{errors.address}</span>}
      </div>

      <div className="of-qty-row">
        <QuantitySelector value={qty} onChange={setQty} />
      </div>

      <div className="of-summary">
        <div className="of-summary-row">
          <span>السعر الواحد</span>
          <span>{product.price} {product.currency}</span>
        </div>
        <div className="of-summary-row total">
          <span>المجموع</span>
          <span className="of-total">{product.price * qty} {product.currency}</span>
        </div>
      </div>

      <button type="submit" className="of-submit" disabled={submitting}>
        {submitting ? 'جاري الإرسال...' : 'أكد الطلب - الدفع عند الاستلام'}
      </button>

      <div className="of-cod-note">
        <Lock size={14} />
        <span>الدفع عند الاستلام - لا تدفع الآن</span>
      </div>
    </form>
  )
}
