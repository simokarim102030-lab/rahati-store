import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, Lock, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { moroccanCities } from '../../data/products'
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector'
import PlaceholderMedia from '../../components/PlaceholderMedia/PlaceholderMedia'
import './Checkout.css'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeItem, getTotal, clearCart } = useCart()
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
      for (const item of cart) {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: form.name,
            phone: form.phone,
            city: form.city,
            address: form.address,
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            total: item.price * item.quantity,
          }),
        })
      }
    } catch (_) {
      // navigate to success regardless
    }

    clearCart()
    navigate('/order-success')
  }

  if (!cart.length) {
    return (
      <div className="co-empty container">
        <ShoppingBag size={56} strokeWidth={1} color="var(--border)" />
        <h2>السلة فارغة</h2>
        <Link to="/products" className="co-empty-btn">تصفحي المنتجات</Link>
      </div>
    )
  }

  const total = getTotal()
  const shipping = total >= 300 ? 0 : 30

  return (
    <div className="co-page">
      <div className="container">
        <h1 className="co-heading">إتمام الطلب</h1>

        <div className="co-layout">
          <form className="co-form-card" onSubmit={handleSubmit} noValidate>
            <h2 className="co-form-title">معلومات التوصيل</h2>

            <div className={`co-field ${errors.name ? 'err' : ''}`}>
              <input name="name" type="text" placeholder="الاسم الكامل" value={form.name} onChange={onChange} />
              {errors.name && <span className="co-err-msg">{errors.name}</span>}
            </div>

            <div className={`co-field ${errors.phone ? 'err' : ''}`}>
              <input name="phone" type="tel" placeholder="رقم الهاتف (06 أو 07)" value={form.phone} onChange={onChange} dir="ltr" />
              {errors.phone && <span className="co-err-msg">{errors.phone}</span>}
            </div>

            <div className={`co-field co-select-wrap ${errors.city ? 'err' : ''}`}>
              <select name="city" value={form.city} onChange={onChange}>
                <option value="">اختر المدينة</option>
                {moroccanCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={18} className="co-chevron" />
              {errors.city && <span className="co-err-msg">{errors.city}</span>}
            </div>

            <div className={`co-field ${errors.address ? 'err' : ''}`}>
              <textarea name="address" rows={3} placeholder="الحي، الشارع، رقم البيت..." value={form.address} onChange={onChange} />
              {errors.address && <span className="co-err-msg">{errors.address}</span>}
            </div>

            <button type="submit" className="co-submit" disabled={submitting}>
              {submitting ? 'جاري التأكيد...' : 'أكد الطلب - الدفع عند الاستلام'}
            </button>
            <div className="co-cod">
              <Lock size={14} />
              <span>الدفع عند الاستلام - لا تدفع الآن</span>
            </div>
          </form>

          <div className="co-summary-card">
            <h2 className="co-sum-title">ملخص الطلب</h2>
            <div className="co-items">
              {cart.map(item => (
                <div key={item.id} className="co-item">
                  <div className="co-item-img">
                    <PlaceholderMedia aspectRatio="1/1" label="" />
                  </div>
                  <div className="co-item-info">
                    <p className="co-item-name">{item.name}</p>
                    <p className="co-item-price">{item.price} {item.currency}</p>
                    <div className="co-item-row">
                      <QuantitySelector value={item.quantity} onChange={q => updateQuantity(item.id, q)} />
                      <button className="co-remove" onClick={() => removeItem(item.id)}><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="co-totals">
              <div className="co-total-row"><span>المجموع الفرعي</span><span>{total} د.م</span></div>
              <div className="co-total-row"><span>الشحن</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'مجاني' : `${shipping} د.م`}</span></div>
              <div className="co-total-row grand"><span>الإجمالي</span><span className="co-grand">{total + shipping} د.م</span></div>
            </div>
            <div className="co-cod-box">
              <span>💵</span>
              <div>
                <p className="co-cod-t">الدفع عند الاستلام</p>
                <p className="co-cod-s">لا تدفعي حتى يصلك المنتج</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
