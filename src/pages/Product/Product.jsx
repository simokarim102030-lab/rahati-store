import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Check, Package } from 'lucide-react'
import { getProductBySlug } from '../../data/products'
import PlaceholderMedia from '../../components/PlaceholderMedia/PlaceholderMedia'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import TrustBar from '../../components/TrustBar/TrustBar'
import OrderForm from '../../components/OrderForm/OrderForm'
import NotFound from '../NotFound/NotFound'
import './Product.css'

const FEATURE_ICONS = ['droplet', 'layers', 'battery-charging', 'gauge']

export default function Product() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [activeThumb, setActiveThumb] = useState(0)

  if (!product) return <NotFound />

  return (
    <div className="prod-page">

      {/* ── HERO ── */}
      <section className="prod-hero">
        <div className="prod-hero-img-wrap">
          <div className="prod-img-arch" />
          <PlaceholderMedia
            aspectRatio="4/3"
            label="PRODUCT IMAGE"
            className="prod-main-img"
          />
        </div>

        <div className="prod-hero-info container">
          <span className="prod-category">{product.category}</span>
          <h1 className="prod-title">{product.name}</h1>
          <p className="prod-short-desc">{product.shortDescription}</p>

          <div className="prod-price-row">
            <span className="prod-price">{product.price} {product.currency}</span>
            {product.oldPrice > product.price && (
              <>
                <span className="prod-old">{product.oldPrice} {product.currency}</span>
                <span className="prod-discount-badge">-{product.discount}%</span>
              </>
            )}
          </div>

          {/* Feature bullets — visible in hero */}
          {product.features && (
            <ul className="prod-feature-list">
              {product.features.map((f, i) => (
                <li key={i} className="prod-feature-item">
                  <span className="prod-feature-dot"><Check size={12} strokeWidth={3} /></span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <a href="#order-form" className="prod-order-btn">
            اطلب الآن
          </a>
        </div>
      </section>

      {/* ── BENEFITS 2×2 ── */}
      {product.benefits && product.benefits.length > 0 && (
        <section className="prod-features container">
          <div className="prod-features-grid">
            {product.benefits.map((b, i) => (
              <FeatureCard
                key={i}
                icon={FEATURE_ICONS[i % FEATURE_ICONS.length]}
                title={b.title}
                description={b.description}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      <section className="prod-gallery container">
        <h2 className="prod-gallery-title">معرض المنتجات</h2>
        <div className="prod-thumbs">
          {[0, 1, 2, 3].map(i => (
            <button
              key={i}
              className={`prod-thumb ${i === activeThumb ? 'active' : ''}`}
              onClick={() => setActiveThumb(i)}
            >
              <PlaceholderMedia aspectRatio="1/1" label={`${i + 1}`} />
            </button>
          ))}
        </div>
      </section>

      {/* ── DETAILS SECTION ── */}
      <section className="prod-details container">
        <div className="prod-details-card">
          {/* Description */}
          <div className="prod-detail-block">
            <h3 className="prod-detail-heading">عن المنتج</h3>
            <p className="prod-detail-text">{product.description}</p>
          </div>

          {/* Usage */}
          {product.usage && (
            <div className="prod-detail-block">
              <h3 className="prod-detail-heading">طريقة الاستعمال</h3>
              <p className="prod-detail-text">{product.usage}</p>
            </div>
          )}

          {/* Box contents */}
          {product.boxContents && (
            <div className="prod-detail-block prod-box-contents">
              <h3 className="prod-detail-heading">
                <Package size={18} />
                محتوى العلبة
              </h3>
              <p className="prod-detail-text">{product.boxContents}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── ORDER FORM ── */}
      <section id="order-form" className="prod-order container">
        <OrderForm product={product} />
      </section>

      {/* ── TRUST ── */}
      <TrustBar />
    </div>
  )
}
