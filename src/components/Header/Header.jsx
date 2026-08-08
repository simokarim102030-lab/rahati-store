import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { getItemCount } = useCart()
  const count = getItemCount()

  return (
    <header className="header">
      <div className="header-inner container">
        {/* Left side: cart + AR (RTL so this is visually left) */}
        <div className="header-left">
          <Link to="/checkout" className="header-cart" aria-label="السلة">
            <div className="cart-circle">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </div>
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
          <span className="header-lang">AR</span>
        </div>

        {/* Logo center/right in RTL */}
        <Link to="/" className="header-logo" onClick={() => setOpen(false)}>
          RAHATI
        </Link>

        {/* Mobile menu button */}
        <button
          className="header-menu-btn"
          onClick={() => setOpen(o => !o)}
          aria-label="القائمة"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown nav */}
      {open && (
        <nav className="header-mobile-nav">
          {[['/', 'الرئيسية'], ['/products', 'المنتجات'], ['/products', 'العروض'], ['/', 'من نحن'], ['/', 'تواصل معنا']].map(([href, label]) => (
            <Link key={label} to={href} className="mobile-nav-item" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
