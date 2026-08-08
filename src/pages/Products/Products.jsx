import { products } from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import TrustBar from '../../components/TrustBar/TrustBar'
import './Products.css'

export default function Products() {
  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="container">
          <h1 className="products-title">جميع المنتجات</h1>
          <p className="products-sub">اكتشفي مجموعتنا الكاملة من أجهزة العناية بالبشرة</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="products-grid-full">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
      <TrustBar />
    </div>
  )
}
