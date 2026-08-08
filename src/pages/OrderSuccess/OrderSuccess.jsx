import { useLocation, Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import PlaceholderMedia from '../../components/PlaceholderMedia/PlaceholderMedia'
import './OrderSuccess.css'

export default function OrderSuccess() {
  const { state } = useLocation()
  const product = state?.product
  const qty = state?.qty || 1
  const total = state?.total

  return (
    <div className="success-page">
      <div className="success-wrap container">

        {/* Check icon */}
        <div className="success-check">
          <Check size={42} strokeWidth={2.5} />
        </div>

        <h1 className="success-title">تم استلام طلبك بنجاح</h1>
        <p className="success-msg">سيتصل بك فريقنا خلال 24 ساعة لتأكيد الطلب</p>

        {/* Order card */}
        {product && (
          <div className="success-order-card">
            <div className="soc-info">
              <p className="soc-name">{product.name}</p>
              <p className="soc-qty">الكمية: {qty}</p>
              <p className="soc-price">{total || product.price * qty} {product.currency}</p>
            </div>
            <div className="soc-img">
              <PlaceholderMedia aspectRatio="1/1" label="صورة" />
            </div>
          </div>
        )}

        <Link to="/products" className="success-btn">تصفح منتجات أخرى</Link>
        <Link to="/" className="success-home-link">العودة للرئيسية</Link>
      </div>
    </div>
  )
}
