import { Link } from 'react-router-dom'
import { Instagram, Facebook } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">RAHATI</Link>
            <p className="footer-tagline">منتجات العناية بالبشرة والجمال</p>
            <p className="footer-desc">أجهزة عناية بالبشرة عالية الجودة، توصيل لجميع مدن المغرب والدفع عند الاستلام.</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>روابط مهمة</h4>
            <ul>
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/products">المنتجات</Link></li>
              <li><Link to="/">من نحن</Link></li>
              <li><Link to="/">تواصل معنا</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>معلومات</h4>
            <ul>
              <li>الدفع عند الاستلام</li>
              <li>توصيل لجميع المدن</li>
              <li>ضمان الجودة</li>
              <li>الشحن والإرجاع</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RAHATI. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
