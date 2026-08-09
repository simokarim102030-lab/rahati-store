import { useEffect, useState } from 'react'
import './ExitPopup.css'

export default function ExitPopup({ product, onAccept, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const key = 'exit_shown_' + product.id
    if (sessionStorage.getItem(key)) return

    const handleMouseLeave = (e) => {
      if (e.clientY <= 10) {
        sessionStorage.setItem(key, '1')
        setVisible(true)
      }
    }

    // Mobile: trigger when page is hidden (user switches tab/app)
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, '1')
          setVisible(true)
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [product.id])

  const handleAccept = () => {
    setVisible(false)
    onAccept(product.exitPrice)
  }

  const handleClose = () => {
    setVisible(false)
    if (onClose) onClose()
  }

  if (!visible || !product.exitPrice) return null

  const saving = product.price - product.exitPrice

  return (
    <div className="exit-overlay" onClick={handleClose}>
      <div className="exit-popup" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close" onClick={handleClose}>×</button>

        <div className="exit-tag">عرض خاص — لك فقط</div>

        <img
          src={product.images.hero}
          alt={product.name}
          className="exit-img"
        />

        <h2 className="exit-title">{product.name}</h2>
        <p className="exit-subtitle">لأنك لم تكمل طلبك، نقدم لك هذا العرض الاستثنائي</p>

        <div className="exit-prices">
          <span className="exit-old">{product.price} {product.currency}</span>
          <span className="exit-new">{product.exitPrice} {product.currency}</span>
        </div>

        <div className="exit-saving">وفّر {saving} {product.currency} الآن</div>

        <button className="exit-cta" onClick={handleAccept}>
          أريد هذا العرض
        </button>
        <button className="exit-skip" onClick={handleClose}>
          لا شكراً، سأدفع أكثر
        </button>
      </div>
    </div>
  )
}
