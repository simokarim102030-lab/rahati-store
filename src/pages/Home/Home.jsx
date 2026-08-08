import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import TrustBar from '../../components/TrustBar/TrustBar'
import './Home.css'

export default function Home() {
  return (
    <div className="home">

      {/* HERO BANNER */}
      <section className="home-hero">
        <div className="container">
          <p className="home-hero-sub">مجموعة RAHATI للعناية بالبشرة</p>
          <h1 className="home-hero-title">اكتشفي سر البشرة المشرقة</h1>
          <p className="home-hero-desc">أجهزة عناية متقدمة بجودة احترافية، توصيل لجميع مدن المغرب والدفع عند الاستلام.</p>
          <Link to="/products" className="home-hero-btn">تسوقي الآن</Link>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="home-products">
        <div className="container">
          <h2 className="home-section-title">منتجاتنا المميزة</h2>
          <p className="home-section-sub">اختاري المنتج المناسب لبشرتك</p>
          <div className="home-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <TrustBar />

    </div>
  )
}
